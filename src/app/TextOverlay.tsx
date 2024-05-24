import React from 'react'

// Define the props interface for the TextOverlay component
interface TextOverlayProps {
  children: React.ReactNode // The content to be displayed in the text overlay
  className?: string // An optional CSS class name for the outer container
  textClassName?: string // An optional CSS class name for the text container
  backgroundColor?: string // The hex code for the background color
  textOpacity?: number // An optional number between 0 and 1 to control the opacity of the text
  backgroundOpacity?: number // An optional number between 0 and 1 to control the opacity of the background
}

// Define the TextOverlay component as a functional component
const TextOverlay: React.FC<TextOverlayProps> = ({
  children,
  className = '', // Set a default value for the className prop
  textClassName = '', // Set a default value for the textClassName prop
  backgroundColor = '#6231f0', // Set a default value for the backgroundColor prop
  textOpacity = 1, // Set a default value for the textOpacity prop
  backgroundOpacity = 0.9, // Set a default value for the backgroundOpacity prop
}) => {
  // Render the TextOverlay component
  return (
    <div
      // Apply the outer container styles, including the optional className prop
      className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 ${className}`}
    >
      <div
        // Apply the background container styles, including the backgroundColor prop
        className={`p-6 md:p-8 rounded-lg shadow-lg ${className}`}
        style={{
          // Set the background color and opacity using the backgroundColor and backgroundOpacity props
          backgroundColor: `rgba(${parseInt(backgroundColor.slice(1, 3), 16)}, ${parseInt(backgroundColor.slice(3, 5), 16)}, ${parseInt(backgroundColor.slice(5, 7), 16)}, ${backgroundOpacity})`,
        }}
      >
        <div
          // Apply the text container styles, including the optional textClassName prop
          className={`text-center text-white ${textClassName}`}
          style={{
            // Set the text opacity using the textOpacity prop
            color: `rgba(255, 255, 255, ${textOpacity})`,
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