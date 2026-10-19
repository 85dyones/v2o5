---
name: "Studio Joshgrafik"
description: "Design tokens extracted from https://www.joshgrafik.com/"
colors:
  primary: "#0D0D0F"
  secondary: "#FFFFFF"
  surface: "#D4D4D4"
  on-surface: "#2E2E2E"
typography:
  label-lg:
    fontFamily: "Suisse Intl"
    fontSize: "134px"
    fontWeight: 500
    lineHeight: 0.93
    letterSpacing: "-6.03px"
  headline-display:
    fontFamily: "Suisse Intl"
    fontSize: "112px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-5.04px"
  headline-lg:
    fontFamily: "Suisse Intl"
    fontSize: "112px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-5.04px"
  headline-display-2:
    fontFamily: "Suisse Intl"
    fontSize: "76px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-2.66px"
  headline-lg-2:
    fontFamily: "Suisse Intl"
    fontSize: "76px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-2.66px"
  label-md:
    fontFamily: "Suisse Intl"
    fontSize: "44px"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-1.1px"
  body-md:
    fontFamily: "Suisse Intl"
    fontSize: "44px"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-1.1px"
  headline-lg-3:
    fontFamily: "Suisse Intl"
    fontSize: "44px"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-1.1px"
  label-md-2:
    fontFamily: "Suisse Intl"
    fontSize: "40px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-1px"
  body-md-2:
    fontFamily: "Suisse Intl"
    fontSize: "40px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-1px"
  body-md-3:
    fontFamily: "Suisse Intl"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: 1.13
    letterSpacing: "-0.64px"
  headline-lg-4:
    fontFamily: "Suisse Intl"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: 1.13
    letterSpacing: "-0.64px"
  body-md-4:
    fontFamily: "Suisse Intl"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.2
  headline-md:
    fontFamily: "Suisse Intl"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.2
  label-md-3:
    fontFamily: "Suisse Intl"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.29
  body-md-5:
    fontFamily: "Suisse Intl"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.29
  label-lg-2:
    fontFamily: "Suisse Intl"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.29
  body-md-6:
    fontFamily: "Suisse Intl"
    fontSize: "17px"
    fontWeight: 450
    lineHeight: 1.29
  body-md-7:
    fontFamily: "Suisse Intl"
    fontSize: "15px"
    fontWeight: 450
    lineHeight: 1.2
  label-lg-3:
    fontFamily: "Suisse Intl"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.2
  label-md-4:
    fontFamily: "Suisse Intl"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.2
  body-md-8:
    fontFamily: "Suisse Intl"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.2
  body-md-9:
    fontFamily: "Suisse Intl"
    fontSize: "13px"
    fontWeight: 450
    lineHeight: 1.23
  body-md-10:
    fontFamily: "Suisse Intl"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.23
  label-md-5:
    fontFamily: "Suisse Intl"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.23
  label-lg-4:
    fontFamily: "Suisse Intl"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.23
    letterSpacing: "0.13px"
  body-md-11:
    fontFamily: "Suisse Intl"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.23
    letterSpacing: "0.13px"
  body-sm:
    fontFamily: "Suisse Intl"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.48px"
spacing:
  xs: "3px"
  sm: "4px"
  md: "4.48px"
  lg: "6px"
  xl: "6.08px"
  xxl: "8px"
  xxxl: "9.12px"
  xxxxl: "10px"
rounded:
  sm: "1700px"
  full: "9999px"
components:
  button-observed:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    rounded: "0px"
    padding: "6px 10px"
---

# Design System

## Overview
Design tokens extracted from joshgrafik.com. The YAML front matter contains machine-readable values observed by Dembrandt when available; the sections below summarize the extracted evidence without redesigning or correcting the source site.

## Colors
- **Primary** (#0D0D0F): Elected: recurring call-to-action background (--ink).
- **Secondary** (#FFFFFF): Observed color token extracted from the site's palette, semantic CSS, or component styles.
- **Surface** (#D4D4D4): Observed color token extracted from the site's palette, semantic CSS, or component styles.
- **On Surface** (#2E2E2E): Observed color token extracted from the site's palette, semantic CSS, or component styles.

## Typography
- **Label Lg**: Suisse Intl, 134px, medium
- **Headline Display**: Suisse Intl, 112px, medium
- **Headline Lg**: Suisse Intl, 112px, medium
- **Headline Display 2**: Suisse Intl, 76px, medium
- **Headline Lg 2**: Suisse Intl, 76px, medium
- **Label Md**: Suisse Intl, 44px, medium
- **Font source**: Google Fonts (DM Mono, Inter Tight)
- **Font URLs**: https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=Inter+Tight:wght@400;450;500&display=swap

## Layout
Observed spacing scale: custom spacing scale.
- **Spacing tokens**: xs 3px, sm 4px, md 4.48px, lg 6px, xl 6.08px, xxl 8px, xxxl 9.12px, xxxxl 10px
- **Responsive breakpoints**: 478px, 860px, 991px, 1100px, 1300px

## Shapes
Observed rounded-corner tokens: sm 1700px, full 9999px.

## Components
- **Buttons**: Observed sample with radius 0px, background #FFFFFF, text #0D0D0F, padding 6px 10px

<!-- dembrandt v0.39.2 -->
