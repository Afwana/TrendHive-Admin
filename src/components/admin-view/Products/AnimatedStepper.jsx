import React, { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const ScrollShadow = ({ children, className = "", hideScrollBar = false }) => {
  return (
    <div
      className={cn(
        "relative overflow-auto",
        hideScrollBar
          ? "scrollbar-hide"
          : "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
};

const AnimatedStepper = ({
  steps,
  currentStep = 1,
  onStepClick = () => {},
}) => {
  const scrollAreaRef = useRef(null);

  const scrollToCurrentStep = (stepIndex) => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea && scrollArea.children.length) {
      const stepElement = scrollArea.children[stepIndex];
      if (stepElement) {
        stepElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  };

  useEffect(() => {
    scrollToCurrentStep(currentStep - 1);
  }, [currentStep]);

  return (
    <ScrollShadow className="max-w-full w-full">
      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden">
        <div
          className="relative flex items-center justify-center min-w-max"
          ref={scrollAreaRef}
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center justify-center px-3 pt-3"
            >
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center z-10 bg-white">
                  <motion.div
                    onClick={() => onStepClick(step.number)}
                    className={cn(
                      "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs",
                      step.number === currentStep
                        ? "border-4 border-[#00687A] bg-[#1800AD] text-white"
                        : step.number < currentStep
                          ? "border-[0.5px] border-[#D0E1E1] bg-[#1800AD] text-white"
                          : "border-[0.5px] border-[#D0E1E1] bg-white text-[#232528]",
                    )}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: step.number === currentStep ? 1.1 : 1,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {step.number}
                  </motion.div>
                  <motion.div
                    className="mt-2 text-center text-sm font-medium text-[#232528]"
                    initial={{ opacity: 0.7 }}
                    animate={{
                      opacity: step.number === currentStep ? 1 : 0.7,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {step.label}
                  </motion.div>
                </div>

                {index < steps.length - 1 && (
                  <motion.div
                    className="flex items-center justify-center h-[2px] m-5 w-[32px] md:w-[150px]"
                    initial={{ backgroundColor: "#C3C6CB" }}
                    animate={{
                      backgroundColor:
                        step.number < currentStep ? "#00687A" : "#C3C6CB",
                      transition: { duration: 0.3 },
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="components mt-4">
        {steps.find((step) => step.number === currentStep)?.component}
      </div>
    </ScrollShadow>
  );
};

export default AnimatedStepper;
