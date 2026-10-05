// ========================================
// LULC PROJECT - KHARAGPUR
// Step 2: Cloud Masking
// ========================================

// Study Area
var aoi = table;


// ----------------------------------------
// 1. Cloud masking function
// ----------------------------------------

function maskS2(image) {

  var scl = image.select('SCL');

  var mask = scl.neq(3)    // Cloud shadow
    .and(scl.neq(8))        // Medium probability cloud
    .and(scl.neq(9))        // High probability cloud
    .and(scl.neq(10))       // Cirrus
    .and(scl.neq(11));      // Snow/ice

  return image.updateMask(mask);
}


// ----------------------------------------
// 2. Load Sentinel-2
// ----------------------------------------

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate('2018-10-01', '2018-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));


// ----------------------------------------
// 3. Apply cloud mask
// ----------------------------------------

var s2_clean = s2.map(maskS2);


// ----------------------------------------
// 4. Create composite
// ----------------------------------------

var composite = s2_clean.median();


// ----------------------------------------
// 5. Display
// ----------------------------------------

Map.centerObject(aoi, 11);

Map.addLayer(
  composite,
  {
    bands: ['B4', 'B3', 'B2'],
    min: 0,
    max: 3000
  },
  'Clean Sentinel-2 RGB 2018'
);


// AOI outline
Map.addLayer(
  aoi.style({
    color: 'red',
    fillColor: '00000000',
    width: 2
  }),
  {},
  'Kharagpur AOI'
);


// ----------------------------------------
// 6. Print image count
// ----------------------------------------

print('Original images:', s2.size());
print('Images after masking:', s2_clean.size());
