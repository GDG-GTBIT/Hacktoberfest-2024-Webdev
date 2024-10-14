/*
 * Zyflo Custom Framer Motion Variants
 * ---------------------------------
 * List of all the custom variants:
 * ---------------------------------
 * Fade Blur In Variants
 * - Fade Blur In From Right
 * - Fade Blur In From Left
 * - Fade Blur In From Top
 * - Fade Blur In From Bottom
 * --------------------------------- 
 * Fade Variants
 * - Fade In From Right
 * - Fade In From Left
 * - Fade In From Top
 * - Fade In From Bottom
 * ---------------------------------
 * Scale Variants
 * - Scale In From Right
 * - Scale In From Left
 * - Scale In From Top
 * - Scale In From Bottom
 * ---------------------------------
 * Blur Variants
 * - Blur In From Right
 * - Blur In From Left
 * - Blur In From Top
 * - Blur In From Bottom
*/

// Zyflo Variant
interface ZyfloVariant {
    [key: string]: any;
}

// Zyflo Variants
interface ZyfloVariants {
    name: string;
    initial: ZyfloVariant;
    animate: (index: number) => ZyfloVariant;
}

/* 
 * Fade Variants
*/

// * Fade Blur In From Right
export const zyfloFadeBlurInFromRightVariants: ZyfloVariants = {
    name: "zyfloFadeBlurInFromRight",
    initial: {
        opacity: 0,
        x: -48,
        filter: `blur(3px)`
    },
    animate: (index) => ({
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Fade Blur In From Top
export const zyfloFadeBlurInFromTopVariants: ZyfloVariants = {
    name: "zyfloFadeBlurInFromTop",
    initial: {
        opacity: 0,
        y: -48,
        filter: "blur(3px)"
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Fade Blur In From Left
export const zyfloFadeBlurInFromLeftVariants: ZyfloVariants = {
    name: "zyfloFadeBlurInFromLeft",
    initial: {
        opacity: 0,
        x: 48,
        filter: "blur(3px)"
    },
    animate: (index) => ({
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Fade Blur In From Bottom
export const zyfloFadeBlurInFromBottomVariants: ZyfloVariants = {
    name: "zyfloFadeBlurInFromBottom",
    initial: {
        opacity: 0,
        y: 40,
        filter: "blur(3px)"
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
}

/* 
 * Fade Variants
*/

// * Fade In From Right
export const zyfloFadeInFromRightVariants: ZyfloVariants = {
    name: "zyfloFadeInFromRight",
    initial: {
        opacity: 0,
        x: -48,
        filter: "blur(0px)"
    },
    animate: (index) => ({
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Fade In From Left
export const zyfloFadeInFromLeftVariants: ZyfloVariants = {
    name: "zyfloFadeInFromLeft",
    initial: {
        opacity: 0,
        x: 48,
        filter: "blur(0px)"
    },
    animate: (index) => ({
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Fade In From Top
export const zyfloFadeInFromTopVariants: ZyfloVariants = {
    name: "zyfloFadeInFromTop",
    initial: {
        opacity: 0,
        y: -19,
        filter: "blur(0px)"
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
}

// * Fade In From Bottom
export const zyfloFadeInFromBottomVariants: ZyfloVariants = {
    name: "zyfloFadeInFromBottom",
    initial: {
        opacity: 0,
        y: 48,
        filter: "blur(0px)"
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
}

/* 
 * Scale Variants
*/

// * Scale In From Left
export const zyfloScaleInFromLeftVariants: ZyfloVariants = {
    name: "zyfloScaleInFromLeft",
    initial: {
        opacity: 0,
        x: 48,
        scale: 0.5
    },
    animate: (index) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Scale In From Right
export const zyfloScaleInFromRightVariants: ZyfloVariants = {
    name: "zyfloScaleInFromRight",
    initial: {
        opacity: 0,
        x: -48,
        scale: 0.5
    },
    animate: (index) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Scale In From Top
export const zyfloScaleInFromTopVariants: ZyfloVariants = {
    name: "zyfloScaleInFromTop",
    initial: {
        opacity: 0,
        y: -48,
        scale: 0.5
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Scale In From Bottom
export const zyfloScaleInFromBottomVariants: ZyfloVariants = {
    name: "zyfloScaleInFromBottom",
    initial: {
        opacity: 0,
        y: 48,
        scale: 0.5
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

export const zyfloScaleInVariants: ZyfloVariants = {
    name: "zyfloScaleIn",
    initial: {
        opacity: 0,
        scale: 0.5
    },
    animate: (index) => ({
        opacity: 1,
        scale: 1,
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

export const zyfloBlurScaleInVariants: ZyfloVariants = {
    name: "zyfloBlurScaleIn",
    initial: {
        opacity: 0,
        filter: "blur(3px)",
        scale: 0
    },
    animate: (index) => ({
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

/* 
 * Blur Variants
*/

// * Blur In From Right
export const zyfloBlurInFromRightVariants: ZyfloVariants = {
    name: "zyfloBlurInFromRight",
    initial: {
        opacity: 0,
        x: 48,
        filter: "blur(3px)"
    },
    animate: (index) => ({
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Blur In From Left
export const zyfloBlurInFromLeftVariants: ZyfloVariants = {
    name: "zyfloBlurInFromLeft",
    initial: {
        opacity: 0,
        x: -48,
        filter: "blur(3px)"
    },
    animate: (index) => ({
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Blur In From Top
export const zyfloBlurInFromTopVariants: ZyfloVariants = {
    name: "zyfloBlurInFromTop",
    initial: {
        opacity: 0,
        y: -48,
        filter: "blur(3px)"
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};

// * Blur In From Bottom
export const zyfloBlurInFromBottomVariants: ZyfloVariants = {
    name: "zyfloBlurInFromBottom",
    initial: {
        opacity: 0,
        y: 48,
        filter: "blur(3px)"
    },
    animate: (index) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            ease: "easeInOut",
            delay: 0.2 * index
        }
    })
};