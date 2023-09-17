import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { Image, Button, HStack, IconButton, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import StandAloneInputSearch from '../standAloneInputSearch'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useActionStore'
import { getMenuViewState, setMenuView } from 'src/store/app/appSlice'
import { constantViewListsMenu } from 'src/constant'

interface FilterToolbarProps {
  compact?: boolean,
  onOpenBtsResto?: () => void,
  nameSelectedTenant?: string,
  tenantPhoto?: string
}
const FilterToolbar:React.FC<FilterToolbarProps> = ({ compact = false, onOpenBtsResto, nameSelectedTenant, tenantPhoto }) => {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')

  const [expandSearch, setExpandSearch] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const getMenuView = useAppSelector((state) => getMenuViewState(state.app))

  const animationVariations1 = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { ease: 'easeInOut' }},
    exit: { opacity: 0, y: 10 }
  }

  const handleExpandSearch = () => {
    setExpandSearch(true)
  }

  const handleMinimizeSearch = () => {
    setExpandSearch(false)
  }

  const handleFilterView = useCallback((view: string) => {
    dispatch(setMenuView(view))
  }, [])

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }
  const resetInput = () => {
    setQuery('')
  }
  useEffect(() => {
    const params = new URLSearchParams()
    if (query) {
      params.append('search', query)
    } else {
      params.delete('search')
    }
  }, [])

  return (
    <>
      {
        !compact &&
        <HStack
          as={motion.div}
          variants={animationVariations1}
          initial="initial"
          animate="animate"
          exit="exit"
          display="grid"
          gridTemplateColumns="1fr auto auto"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/menu/search?search=' + query)
            }}
          >
            <StandAloneInputSearch onChange={onChange} value={query} onClear={resetInput} autoComplete="off"/>
          </form>
          <IconButton
            variant="solid"
            backgroundColor="transparent"
            fontSize="2xl"
            icon={<i className="bx bx-list-ul"></i>}
            aria-label="list"
            disabled={
              getMenuView === constantViewListsMenu.LIST || !getMenuView
            }
            _disabled={{
              backgroundColor: 'gray.200'
            }}
            onClick={() => handleFilterView(constantViewListsMenu.LIST)}
          />
          <IconButton
            variant="solid"
            backgroundColor="transparent"
            fontSize="2xl"
            icon={<i className="bx bx-grid-alt" ></i>}
            aria-label="grid"
            disabled={getMenuView === constantViewListsMenu.GRID}
            _disabled={{
              backgroundColor: 'gray.200'
            }}
            onClick={() => handleFilterView(constantViewListsMenu.GRID)}
          />
        </HStack>
      }
      {
        compact &&
        <motion.div
          variants={animationVariations1}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {
            !expandSearch &&
            <HStack
              display="grid"
              gridTemplateColumns="1fr auto"
              as={motion.div}
              variants={animationVariations1}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Button
                variant="solid"
                backgroundColor="transparent"
                boxShadow="md"
                leftIcon={<Image width="6" height="6" rounded="full" src={tenantPhoto} fallbackSrc="/images/resto_placeholder.png" />}
                rightIcon={<i className="bx bx-caret-down" ></i>}
                height={'100%'}
                onClick={onOpenBtsResto}
              >
                <Text noOfLines={1}>{nameSelectedTenant || '...'}</Text>
              </Button>
              <IconButton onClick={handleExpandSearch} variant="solid" colorScheme="whiteAlpha" color="black" boxShadow="md" fontSize="2xl" icon={<i className="bx bx-search" ></i>} aria-label="grid" />
            </HStack>
          }
          {
            expandSearch &&
            <motion.div
              variants={animationVariations1}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  navigate('/menu/search?search=' + query)
                }}
              >
                <HStack width="full">
                  <IconButton
                    fontSize="2xl"
                    variant="solid"
                    background="transparent"
                    icon={<i className="bx bx-left-arrow-alt"></i>}
                    aria-label="minimize search"
                    onClick={handleMinimizeSearch}
                  />
                  <StandAloneInputSearch onChange={onChange} value={query} onClear={resetInput}/>
                </HStack>
              </form>
            </motion.div>
          }
        </motion.div>
      }
    </>
  )
}
export default FilterToolbar
