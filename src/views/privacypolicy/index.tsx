import React, { useState } from 'react'
import { Box, Heading, OrderedList, Text, Input, Divider, ListItem, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import NavigationPane from 'src/components/navigationPane'
import { useNavigate } from 'react-router-dom'

const PrivacyPolicy = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const resetInput = () => {
    setText('')
  }
  return (
    <>
      <Box height="full">
        <NavigationPane title="Kebijakan Privasi" type="LEFT" onClick={() => navigate('/')}/>
        <Box display="flex" marginX="4" marginY="4">
          <InputGroup>
            <InputLeftElement pointerEvents="none" fontSize="2xl">
              <i className="bx bx-search"></i>
            </InputLeftElement>
            <Input type="text" variant="filled" backgroundColor="white" boxShadow="md" placeholder="Cari" value={text || ''} onChange={handleChange} />
            <InputRightElement>
              <Text as="i" fontSize="3xl" className="bx bx-x" color="#767676" cursor="pointer" onClick={() => { resetInput() }}></Text>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="left" textAlign="left" marginLeft="4" marginRight="4">
          <Text
            fontSize="18px"
            fontWeight="600"
          >
            Ketentuan Umum
          </Text>
          <Text
            fontSize="14px"
            fontWeight="400"
            marginTop="1"
          >
            Olsera mengumpulkan alamat e-mail dari orang yang mengirimkan e-mail. Kami juga mengumpulkan informasi tentang apa akses halaman pengguna dan informasi yang diberikan kepada kami oleh pengguna melalui survei dan pendaftaran situs. Informasi tersebut mungkin berisi data pribadi tentang Anda termasuk alamat Anda, nomor telepon, nomor kartu kredit dll. Olsera melindungi informasi kartu kredit sesuai dengan standar keamanan. Kami tidak diperbolehkan untuk mengungkapkan informasi pribadi tanpa izin tertulis dari Anda. Namun, informasi tertentu yang dikumpulkan dari Anda dan tentang Anda digunakan dalam konteks menyediakan layanan kami kepada Anda. Informasi yang kami kumpulkan tidak dibagi dengan, dijual atau disewakan kepada orang lain, kecuali dalam keadaan tertentu dan yang penggunaan Layanan tersebut dianggap telah mendapatkan persetujuan yang valid untuk mengungkapkan hal-hal berikut:
            <OrderedList>
              <ListItem>Olsera dapat berbagi informasi pribadi dalam rangka untuk menyelidiki, mencegah, atau mengambil tindakan terkait dengan aktivitas ilegal, dugaan penipuan, situasi yang melibatkan kemungkinan ancaman terhadap keselamatan fisik seseorang, pelanggaran istilah Olsera penggunaan, atau sebagaimana diharuskan oleh hukum.</ListItem>
              <ListItem>Olsera mempekerjakan perusahaan lain untuk melakukan tugas-tugas atas nama kami dan mungkin perlu untuk berbagi informasi Anda dengan mereka untuk menyediakan produk dan layanan kepada Anda.</ListItem>
              <ListItem>Kami akan mentransfer informasi tentang Anda jika Olsera dipindahtangankan kepada perusahaan lain. Dalam hal ini, Olsera akan memberitahu Anda melalui email atau dengan meletakkan pemberitahuan yang jelas di situs web Olsera sebelum informasi tentang Anda yang sudah ditransfer menjadi tunduk pada kebijakan privasi yang berbeda.</ListItem>
            </OrderedList>
          </Text>
        </Box>
        <Divider marginTop="6" marginBottom="6" />
        <Box
          justifyContent="left"
          display="flex"
          flexDirection="column"
          alignItems="left"
          margin="4"
        >
          <Heading
            fontSize="18px"
            fontWeight="600"
          >
            Apa yang kami lakukan dengan informasi Anda?
          </Heading>
          <OrderedList
            fontSize="14px"
            fontWeight="400"
            marginTop="1"
          >
            <ListItem>
              Istilah {`"Informasi Pribadi"`} yang digunakan di sini didefinisikan sebagai setiap informasi yang mengidentifikasi atau dapat digunakan untuk mengidentifikasi, menghubungi atau mencari orang kepada siapa berkaitan informasi tersebut. Informasi pribadi yang kami kumpulkan akan tunduk pada Kebijakan Privasi ini, sebagai telah diubah dari waktu ke waktu.
            </ListItem>
            <ListItem>
              Ketika Anda mendaftar untuk Olsera kami menanyakan nama, nama perusahaan dan alamat email dan Anda menyatakan kesediaan untuk memberikan informasi tersebut ketika Anda bergabung dengan layanan kami.
            </ListItem>
            <ListItem>
              Olsera menggunakan informasi yang kami kumpulkan untuk keperluan umum berikut: produk dan jasa penyediaan, penagihan, identifikasi dan otentikasi, peningkatan layanan, kontak, dan penelitian.
            </ListItem>
            <ListItem>
              Sebagai bagian dari pembelian dan penjualan proses pada Olsera, Anda akan mendapatkan alamat email dan / atau alamat pengiriman dari pelanggan Anda. Anda setuju bahwa, sehubungan dengan Informasi Pribadi pengguna lain yang Anda dapatkan melalui Olsera atau melalui komunikasi Olsera terkait atau transaksi yang difasilitasi Olsera, Olsera dengan ini memberikan kepada Anda lisensi untuk menggunakan informasi tersebut hanya untuk komunikasi komersial yang menjadi tanggung jawab Anda tanpa melibatkan Olsera. Olsera tidak mentolerir spam. Oleh karena itu, tanpa mengabaikan ketentuan di atas, Anda tidak diperbolehkan untuk menambahkan nama seseorang yang telah membeli item dari Anda, untuk daftar email Anda (email atau surat fisik) tanpa persetujuan mereka.
            </ListItem>
          </OrderedList>
        </Box>
      </Box>
    </>
  )
}

export default PrivacyPolicy
