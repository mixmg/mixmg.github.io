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

## Output Parameters Explained

- **Outer Radius**: Represents the maximum distance from the center point within which the cursor's position is smoothed. Beyond this radius, smoothing is applied at a reduced rate.
- **Inner Radius**: Defines a smaller circular region where the pen's movement is precisely tracked by the cursor without any delay or smoothing effect. This is the range where the cursor is most responsive to the pen's movements.
- **Initial Smoothing Coefficient**: The base value that determines the strength of smoothing when the pen's movement is within the inner radius. Higher values result in stronger initial smoothing.
- **Soft Knee Scale**: Controls how smoothly the transition occurs between the inner and outer radii. A higher value results in a more gradual change from precise movement to smooth movement.
- **Smoothing Leak Coefficient**: Allows the smoothing effect to extend slightly beyond the outer radius, but at a diminishing rate. This parameter ensures that there isn't a sharp cutoff in smoothing, which could cause jittery movements.



## Getting Help

If you have any questions or issues, please reach out via GitHub Issues.