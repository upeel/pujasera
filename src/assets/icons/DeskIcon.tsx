import { Icon, IconProps } from '@chakra-ui/react'
import React from 'react'

const DeskIcon:React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.998 2.667c-.651 0-1.208.47-1.315 1.113l-.334 2a1.333 1.333 0 001.315 1.553h1.05v5.51a.49.49 0 00.977.067l.4-2.91h5.818l.4 2.91a.49.49 0 00.977-.067v-5.51h1.05c.824 0 1.45-.74 1.315-1.553l-.334-2a1.333 1.333 0 00-1.315-1.113H2.998zm7.727 6l-.171-1.243a.67.67 0 01-.007-.09H5.453c0 .03-.002.06-.007.09l-.17 1.243h5.449zM2.998 4h10.004l.334 2H2.664l.334-2z"
        clipRule="evenodd"
      ></path>
    </Icon>
  )
}

export default DeskIcon
