// limit * totalPages <= 1000!
// else API answers 403
// "You have requested too many results. Please refine your parameters."
const TOTAL_ITEMS_API = 1000;

function generateArtworkImageURL(imageId: string) {
  return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
}

export { TOTAL_ITEMS_API, generateArtworkImageURL };
