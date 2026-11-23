import React from 'react';
import TransformationsGallery from './TransformationsGallery';

export default function GallerySection({ items = [] }) {
  return <TransformationsGallery items={items} />;
}
