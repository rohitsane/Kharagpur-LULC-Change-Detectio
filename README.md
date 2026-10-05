# Land Use/Land Cover (LULC) Mapping and Change Detection of Kharagpur

## Project Overview

This project performs Land Use/Land Cover (LULC) classification and change detection for the Kharagpur region using multi-temporal Sentinel-2 satellite imagery and Google Earth Engine.

The study compares LULC for **2018 and 2025** using five classes:

| Class | Category |
|---:|---|
| 0 | Water |
| 1 | Vegetation |
| 2 | Agriculture |
| 3 | Barren Land |
| 4 | Built-up |

A Random Forest classifier is used with Sentinel-2 spectral bands and derived spectral indices.

## Objectives

1. Prepare cloud-masked Sentinel-2 imagery for Kharagpur.
2. Generate image composites.
3. Calculate NDVI, NDWI and NDBI.
4. Classify the study area into five LULC classes.
5. Assess classification accuracy.
6. Calculate LULC area statistics.
7. Produce LULC maps for 2018 and 2025.
8. Detect and quantify LULC changes between 2018 and 2025.

## Data

### Satellite Data

Sentinel-2 Surface Reflectance Harmonized:

```text
COPERNICUS/S2_SR_HARMONIZED
```

The imagery is accessed directly through Google Earth Engine and is not stored in this repository.

### Study Area

The study area is the Kharagpur region represented by the project Area of Interest (AOI).

## Methodology

```text
Sentinel-2 Imagery
        ↓
Cloud Masking using SCL
        ↓
Median Composite
        ↓
Spectral Bands
        ↓
NDVI + NDWI + NDBI
        ↓
Training Samples
        ↓
Random Forest Classification
        ↓
2018 / 2025 LULC Maps
        ↓
Accuracy Assessment
        ↓
LULC Area Statistics
        ↓
2018–2025 Change Detection
```

## Spectral Features

The classifier uses:

- B2 — Blue
- B3 — Green
- B4 — Red
- B8 — Near Infrared (NIR)
- B11 — Short-Wave Infrared (SWIR)
- B12 — Short-Wave Infrared (SWIR)

### NDVI

Normalized Difference Vegetation Index:

```text
NDVI = (B8 - B4) / (B8 + B4)
```

### NDWI

Normalized Difference Water Index:

```text
NDWI = (B3 - B8) / (B3 + B8)
```

### NDBI

Normalized Difference Built-up Index:

```text
NDBI = (B11 - B8) / (B11 + B8)
```

## Classification Method

A Random Forest classifier is used with:

```text
Number of trees = 100
Random seed = 42
```

The 2018 training dataset contains:

```text
Water        : 764 pixels
Vegetation   : 3379 pixels
Agriculture  : 1838 pixels
Barren       : 3500 pixels
Built-up     : 5872 pixels
--------------------------------
Total        : 15353 pixels
```

The data is split into:

```text
70% → Training
30% → Validation
```

## 2018 Classification Results

### Accuracy

| Metric | Result |
|---|---:|
| Overall Accuracy | 95.15% |
| Kappa Coefficient | 0.9342 |

### 2018 LULC Area

| Class | Area (ha) | Area (km²) |
|---|---:|---:|
| Water | 733.64 | 7.34 |
| Vegetation | 1,350.16 | 13.50 |
| Agriculture | 1,699.37 | 16.99 |
| Barren Land | 1,399.71 | 14.00 |
| Built-up | 3,687.26 | 36.87 |
| **Total** | **8,870.14** | **88.70** |

## Change Detection

The 2018 and 2025 classified images will be compared pixel-by-pixel.

```text
2018 LULC Map ───────┐
                     ├──→ Pixel-wise Comparison ──→ Change Map
2025 LULC Map ───────┘
```

This will identify transitions such as:

- Vegetation → Built-up
- Agriculture → Built-up
- Agriculture → Vegetation
- Barren → Built-up
- Water → Barren

The final analysis will include class areas, increases/decreases, transition statistics and a spatial change-detection map.

## Repository Structure

```text
Kharagpur-LULC-Change-Detection/
│
├── README.md
│
├── Google-Earth-Engine/
│   ├── LULC_2018.js
│   ├── LULC_2025.js
│   └── Change_Detection.js
│
├── Results/
│   ├── LULC_2018.png
│   ├── LULC_2025.png
│   └── Change_Detection.png
│
└── Documentation/
    └── methodology.pdf
```

## Google Earth Engine

The implementation is written in Google Earth Engine JavaScript.

To reproduce the analysis:

1. Open the Google Earth Engine Code Editor.
2. Import/create the Kharagpur AOI.
3. Add the project JavaScript files.
4. Ensure the required training geometries are available.
5. Run the 2018 classification.
6. Run the 2025 classification.
7. Run the change-detection analysis.

## Reproducibility

The repository contains the implementation code and documentation required to understand the workflow.

Satellite imagery is accessed dynamically through Google Earth Engine rather than uploaded to GitHub.

The Random Forest parameters and random seed are fixed to improve reproducibility.

## Project Status

- [x] Kharagpur AOI preparation
- [x] Sentinel-2 2018 data preparation
- [x] Cloud masking
- [x] Spectral feature generation
- [x] NDVI calculation
- [x] NDWI calculation
- [x] NDBI calculation
- [x] Five-class training data preparation
- [x] Random Forest classification
- [x] 2018 accuracy assessment
- [x] 2018 LULC area calculation
- [ ] 2025 classification
- [ ] 2025 accuracy assessment
- [ ] 2025 LULC area calculation
- [ ] 2018–2025 change detection
- [ ] Final change statistics
- [ ] Final maps and documentation

## Technologies Used

- Google Earth Engine
- JavaScript
- Sentinel-2
- Random Forest
- Remote Sensing
- GIS / LULC Analysis

## Author

**M.Tech — IIT Kharagpur**

Project: **Land Use/Land Cover Mapping and Change Detection of Kharagpur using Multi-temporal Sentinel-2 Imagery**

## License

This repository is intended for academic and educational use.
