import React from 'react'

// Define the props interface for the TextOverlay component
interface TextOverlayProps {
  children: React.ReactNode // The content to be displayed in the text overlay
  className?: string // An optional CSS class name for the outer container
  textClassName?: string // An optional CSS class name for the text container
  backgroundClassName?: string // An optional CSS class name for the background container
  textOpacity?: number // An optional number between 0 and 1 to control the opacity of the text
  backgroundOpacity?: number // An optional number between 0 and 1 to control the opacity of the background
}

// Define the TextOverlay component as a functional component
const TextOverlay: React.FC<TextOverlayProps> = ({
  children,
  className = '', // Set a default value for the className prop
  textClassName = '', // Set a default value for the textClassName prop
  backgroundClassName = '', // Set a default value for the backgroundClassName prop
  textOpacity = 1, // Set a default value for the textOpacity prop
  backgroundOpacity = 0.955, // Set a default value for the backgroundOpacity prop
}) => {
  // Render the TextOverlay component
  return (
    <div
      // Apply the outer container styles, including the optional className prop
      className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 ${className}`}
    >
      <div
        // Apply the background container styles, including the optional backgroundClassName prop
        className={`bg-white p-6 md:p-8 rounded-lg shadow-lg ${backgroundClassName}`}
        style={{
          // Set the background opacity using the backgroundOpacity prop
          backgroundColor: `rgba(255, 255, 255, ${backgroundOpacity})`,
        }}
      >
        <div
          // Apply the text container styles, including the optional textClassName prop
          className={`text-center ${textClassName}`}
          style={{
            // Set the text opacity using the textOpacity prop
            color: `rgba(0, 0, 0, ${textOpacity})`,
            fontSize: '1em',
            lineHeight: '1.5em',
          }}
        >
          {/* Render the children prop as the content of the text overlay */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default TextOverlay
