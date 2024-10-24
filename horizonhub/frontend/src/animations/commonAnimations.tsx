// Copyright Horizon Hotel Group 2024 (https://github.com/Bikatr7/CS3300GroupProject) ([url placeholder])
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

// maintain allman bracket style for consistency

// motion
import { Variants } from 'framer-motion';

export const textVariants: Variants = 
{
    hidden: { opacity: 0, y: 20 },
    visible: 
    { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export const containerVariants: Variants = 
{
    hidden: { opacity: 0 },
    visible: 
    { 
        opacity: 1,
        transition: 
        { 
            staggerChildren: 0.2
        }
    }
};

export const imageVariants: Variants = 
{
    hover: 
    { 
        scale: 1.05,
        transition: { duration: 0.3 }
    }
};

export const buttonVariants: Variants = 
{
    hover: 
    { 
        scale: 1.05,
        transition: 
        { 
            duration: 0.3,
            yoyo: Infinity
        }
    }
};

export const githubButtonVariants: Variants = 
{
    hover: 
    { 
        x: [0, 5, 0],
        transition: 
        { 
            duration: 0.5,
            repeat: Infinity
        }
    }
};

export const createContainerVariants = (reverse: boolean): Variants => 
({
    hidden: { opacity: 0, x: reverse ? 50 : -50 },
    visible: 
    { 
        opacity: 1, 
        x: 0,
        transition: 
        { 
            duration: 0.5, 
            ease: "easeOut",
            staggerChildren: 0.2
        }
    }
});