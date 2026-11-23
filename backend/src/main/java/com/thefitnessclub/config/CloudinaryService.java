package com.thefitnessclub.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;
    private final boolean isConfigured;

    public CloudinaryService(
            @Value("${app.cloudinary.cloud-name:}") String cloudName,
            @Value("${app.cloudinary.api-key:}") String apiKey,
            @Value("${app.cloudinary.api-secret:}") String apiSecret) {

        if (cloudName != null && !cloudName.isBlank()
                && apiKey != null && !apiKey.isBlank()
                && apiSecret != null && !apiSecret.isBlank()) {
            this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName.trim(),
                    "api_key", apiKey.trim(),
                    "api_secret", apiSecret.trim(),
                    "secure", true
            ));
            this.isConfigured = true;
        } else {
            this.cloudinary = null;
            this.isConfigured = false;
        }
    }

    public boolean isConfigured() {
        return isConfigured;
    }

    @SuppressWarnings("rawtypes")
    public String uploadImage(MultipartFile file, String folder) throws IOException {
        if (!isConfigured) {
            throw new IllegalStateException("Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
        }

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", (folder != null && !folder.isBlank()) ? folder : "the-fitness-club",
                "resource_type", "image"
        ));

        Object secureUrl = uploadResult.get("secure_url");
        if (secureUrl != null) {
            return secureUrl.toString();
        }

        Object url = uploadResult.get("url");
        if (url != null) {
            return url.toString();
        }

        throw new IOException("Failed to obtain image URL from Cloudinary response.");
    }
}
