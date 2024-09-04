# AbstractQbit's Radial Follow Smoothing Calculator

## Overview

This calculator computes smoothing parameters using predefined coefficients. It approximates ideal values by applying fixed multipliers to the input dimensions provided by the user.

## Usage

1. Enter the **Width** and **Height** of your tablet area in the provided form.
2. The **Aspect Ratio** will be calculated automatically based on the input dimensions.
3. Click the **Calculate** button to compute the following parameters:
   - **Outer Radius**
   - **Inner Radius**
   - **Initial Smoothing Coefficient**
   - **Soft Knee Scale**
   - **Smoothing Leak Coefficient**
4. You can toggle the **Smaller Cursor Lag, Less Precision** checkbox to adjust the smoothing settings.

## Output Parameters

- **Outer Radius**: The maximum distance the cursor can lag behind the actual reading.
- **Inner Radius**: The maximum distance the tablet reading can deviate from the cursor without moving it.
- **Initial Smoothing Coefficient**: The initial coefficient for smoothing calculations.
- **Soft Knee Scale**: Determines the softness of the transition between smoothing inside and outside the outer radius.
- **Smoothing Leak Coefficient**: Allows for input smoothing to continue past the outer radius at a reduced rate.


## Getting Help

If you have any questions or issues, please reach out via GitHub Issues.
