import React, { useState } from 'react'
import { Button, MenuButton, Menu as MenuChakra, Text, MenuOptionGroup, MenuItemOption, MenuList, HStack, Image } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const languageSupport = [
  {
    name: 'Indonesia',
    code: 'id'
  },
  {
    name: 'English',
    code: 'en'
  }
]

interface SelectCountryProps {
  isDisabled?: boolean
}

const SelectCountry:React.FC<SelectCountryProps> = ({ isDisabled }) => {
  const { i18n } = useTranslation()
  const [lng, setLng] = useState<string>(i18n.language)

  const handleChangeLang = (e:string | string[]) => {
    if (typeof e === 'string') {
      i18n.changeLanguage(e)
      setLng(e)
    }
  }

  return (
    <MenuChakra closeOnSelect={false} isLazy>
      <MenuButton
        disabled={isDisabled}
        as={Button}
        rightIcon={<Text as="i" className="bx bx-chevron-down"></Text>}
        variant="ghost"
      >
        <Image src={`/icons/flag/${lng}.svg`}/>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue={lng} onChange={(e) => handleChangeLang(e)} type="radio">
          {
            languageSupport.map((lang, i) => (
              <MenuItemOption value={lang.code} key={i}>
                <HStack>
                  <Image src={`/icons/flag/${lang.code}.svg`}/>
                  <Text>{lang.name}</Text>
                </HStack>
              </MenuItemOption>
            ))
          }
        </MenuOptionGroup>
      </MenuList>
    </MenuChakra>
  )
}

export default SelectCountry
