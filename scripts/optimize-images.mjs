#!/usr/bin/env node
// One-off image pass (Phase 10): PNG/JPEG -> WebP q80, widths capped at ~2x the
// largest displayed size, banner small variants and gallery thumbnails.
// Not part of the build; sharp-cli runs through npx, nothing is added to package.json.
// The originals were deleted once nothing referenced them, so this is kept for
// the record and only re-runs against fresh PNG/JPEG sources.
//   node scripts/optimize-images.mjs

import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

function convert(input, output, width) {
  const args = ['--yes', 'sharp-cli', '-i', path.join(publicDir, input), '-o', path.join(publicDir, output), '-f', 'webp', '-q', '80'];
  if (width) args.push('resize', String(width), '--withoutEnlargement');
  execFileSync('npx', args, { stdio: 'inherit' });
}

// Same folder, same name, .webp; `width` caps the output width.
const inPlace = (files, width) => files.map((file) => [file, width]);
const names = (dir, list, ext = 'png') => list.map((n) => `${dir}/${n}.${ext}`);

const inPlaceJobs = [
  ...inPlace(names('Experts', ['Dhaval', 'Jigar', 'Rohan', 'Siva', 'SpeakerVenkat', 'Vaibhav', 'Vikas'])),
  ...inPlace(names('Team', ['Bharat', 'Daman', 'Dhaval', 'Harsh', 'Kevin', 'Shalin', 'Vikas', 'Vinay'])),
  ...inPlace(
    names('Volunteer', ['Akshay', 'Aryan', 'Bharat', 'Damansingh', 'Dhaval', 'Harsh', 'Harshit', 'Jayesh', 'Kevin', 'Meet', 'Pravin', 'Ravi', 'Sandip', 'Shalin', 'Sourav', 'Vikas', 'Vinay']),
  ),
  ...inPlace(names('Goodies', ['Bag', 'Food', 'Speakers'])),
  ...inPlace(names('AvatarIcon', ['Av1', 'Av2', 'Av3', 'Av4', 'Av5'], 'jpeg'), 100),
  ...inPlace(['Home/VenkatXl.png', 'Home/VenkatSm.png', 'Img/AboutEvent.png', 'Img/AboutCommunity.png', 'Img/FooterBottomImg.png', 'Img/SkeletonIcon.png', 'Img/ItWork.png', 'Sponsors/Staunchsys.png', 'Workshop/WorkShop.png']),
  ['Img/GDG_Gandhinagar.png', 480],
  ['Sponsors/Hemal.png', 512],
];
for (const [file, width] of inPlaceJobs) convert(file, file.replace(/\.(png|jpeg)$/, '.webp'), width);

// Banners: <name>.webp (1200 wide) plus <name>-640.webp for srcset (src/lib/images.js).
for (const banner of ['Home/event-banner.png', 'Home/community-banner.png']) {
  const base = banner.replace(/\.png$/, '');
  convert(banner, `${base}.webp`, 1200);
  convert(banner, `${base}-640.webp`, 640);
}

// Gallery thumbnails (sample gallery reuses images from other folders).
const sampleGallery = 'gallery/sample-meetup-java-records-deep-dive-photos/thumbs';
['Home/event-banner.png', 'Img/AboutEvent.png', 'Img/AboutCommunity.png', 'Workshop/WorkShop.png'].forEach((file, i) => {
  convert(file, `${sampleGallery}/photo-${i + 1}.webp`, 800);
});
