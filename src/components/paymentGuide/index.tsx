import React from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ListItem, OrderedList, Text } from '@chakra-ui/react'

interface PaymentGuideProps {
  code: string,
  virtualAccount?: string
}

const PaymentGuideVA:React.FC<PaymentGuideProps> = ({ code, virtualAccount }) => {
  if (code === 'MANDIRI') {
    return (
      <>
        <Accordion allowToggle mt="6" className="ol-accordion">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                    Mesin ATM
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList>
                <ListItem>
                  Masukkan kartu ATM dan pilih &quot;Bahasa Indonesia&quot;
                </ListItem>
                <ListItem>
                  Ketik nomor PIN dan tekan BENAR
                </ListItem>
                <ListItem>
                  Pilih menu “BAYAR/BELI”
                </ListItem>
                <ListItem>
                  Pilih menu “MULTI PAYMENT”
                </ListItem>
                <ListItem>
                  Ketik kode perusahaan, yaitu &quot;88908&quot; (Xendit 88908), tekan &quot;BENAR&quot;
                </ListItem>
                <ListItem>
                  Masukkan nomor Virtual Account (<strong>{virtualAccount}</strong>)
                </ListItem>
                <ListItem>
                  Isi NOMINAL, kemudian tekan &quot;BENAR&quot;
                </ListItem>
                <ListItem>
                  Muncul konfirmasi data customer. Pilih Nomor 1 sesuai tagihan yang akan dibayar, kemudian tekan &quot;YA&quot;
                </ListItem>
                <ListItem>
                  Muncul konfirmasi pembayaran. Tekan &quot;YA&quot; untuk melakukan pembayaran
                </ListItem>
                <ListItem>
                  Bukti pembayaran dalam bentuk struk agar disimpan sebagai bukti pembayaran yang sah dari Bank Mandiri
                </ListItem>
                <ListItem>
                  Transaksi Anda sudah selesai
                </ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                    Mobile Banking
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList>
                <ListItem>
                  Log in Mobile Banking Mandiri Online
                </ListItem>
                <ListItem>
                  Klik &quot;Icon Menu&quot; di sebelah kiri atas
                </ListItem>
                <ListItem>
                  Pilih menu &quot;Pembayaran&quot;
                </ListItem>
                <ListItem>
                  Pilih &quot;Buat Pembayaran Baru&quot;
                </ListItem>
                <ListItem>
                  Pilih &quot;Multi Payment&quot;
                </ListItem>
                <ListItem>
                  Pilih Penyedia Jasa &quot;Xendit 88908&quot;
                </ListItem>
                <ListItem>
                  Pilih &quot;No. Virtual&quot;
                </ListItem>
                <ListItem>
                  Masukkan no virtual account anda <strong>{virtualAccount}</strong> lalu pilih &quot;Tambah Sebagai Nomor Baru&quot;
                </ListItem>
                <ListItem>
                  Masukkan &quot;Nominal&quot; lalu pilih &quot;Konfirmasi&quot;
                </ListItem>
                <ListItem>
                  Pilih &quot;Lanjut&quot;
                </ListItem>
                <ListItem>
                          Muncul tampilan konfirmasi pembayaran
                </ListItem>
                <ListItem>
                          Scroll ke bawah di tampilan konfirmasi pembayaran lalu pilih &quot;Konfirmasi&quot;
                </ListItem>
                <ListItem>
                          Masukkan &quot;PIN&quot; dan transaksi telah selesai
                </ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                    Internet Banking
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList>
                <ListItem>
                  Kunjungi website Mandiri Internet Banking:
                  <a href="https://ibank.bankmandiri.co.id/retail3/" target="_blank" rel="noreferrer">
                  klik disini
                  </a>
                </ListItem>
                <ListItem>
                  Login dengan memasukkan USER ID dan PIN
                </ListItem>
                <ListItem>
                  Pilih &quot;Pembayaran&quot;
                </ListItem>
                <ListItem>
                          Pilih &quot;Multi Payment&quot;
                </ListItem>
                <ListItem>
                          Pilih &quot;No Rekening Anda&quot;
                </ListItem>
                <ListItem>
                          Pilih Penyedia Jasa &quot;Xendit 88908&quot;
                </ListItem>
                <ListItem>
                          Pilih &quot;No Virtual Account&quot;
                </ListItem>
                <ListItem>
                          Masukkan nomor Virtual Account anda <strong>{virtualAccount}</strong>
                </ListItem>
                <ListItem>
                          Masuk ke halaman konfirmasi 1
                </ListItem>
                <ListItem>
                          Apabila benar/sesuai, klik tombol tagihan TOTAL, kemudian klik &quot;LANJUTKAN&quot;
                </ListItem>
                <ListItem>
                          Masuk ke halaman konfirmasi 2
                </ListItem>
                <ListItem>
                          Masukkan Challenge Code yang dikirimkan ke Token Internet Banking Anda, kemudian klik &quot;Kirim&quot;
                </ListItem>
                <ListItem>
                          Anda akan masuk ke halaman konfirmasi jika pembayaran telah selesai
                </ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </>
    )
  }
  if (code === 'BNI') {
    return (
      <>
        <Accordion allowToggle mt="6" className="ol-accordion">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  ATM
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList>
                <ListItem>
                Masukkan Kartu Anda.
                </ListItem>
                <ListItem>
                Pilih Bahasa.
                </ListItem>
                <ListItem>
                Masukkan PIN ATM Anda.
                </ListItem>
                <ListItem>
                Pilih &quot;Menu Lainnya&quot;.
                </ListItem>
                <ListItem>
                Pilih &quot;Transfer&quot;.
                </ListItem>
                <ListItem>
                Pilih Jenis rekening yang akan Anda gunakan (Contoh: &quot;Dari Rekening Tabungan&quot;).
                </ListItem>
                <ListItem>
                Pilih “Virtual Account Billing” .
                </ListItem>
                <ListItem>
                Masukkan nomor Virtual Account Anda (<strong>{virtualAccount}</strong>).
                </ListItem>
                <ListItem>
                Konfirmasi, apabila telah sesuai, lanjutkan transaksi.
                </ListItem>
                <ListItem>
                Transaksi Anda telah selesai
                </ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Mobile Banking BNI
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList>
                <ListItem>
                  Akses BNI Mobile Banking dari handphone kemudian masukkan user ID dan password.
                </ListItem>
                <ListItem>
                  Pilih menu “Transfer”.
                </ListItem>
                <ListItem>
                  Pilih menu “Virtual Account Billing” kemudian pilih rekening debet.
                </ListItem>
                <ListItem>
                  Masukkan nomor Virtual Account Anda (<strong>{virtualAccount}</strong>) pada menu “input baru”.
                </ListItem>
                <ListItem>
                  Konfirmasi transaksi anda
                </ListItem>
                <ListItem>
                  Masukkan Password Transaksi.
                </ListItem>
                <ListItem>
                  Pembayaran Anda Telah Berhasil.
                </ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Internet Banking BNI
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList>
                <ListItem>
                Ketik alamat https://ibank.bni.co.id kemudian “klik Enter” atau
                  <a href="https://ibank.bni.co.id" target="_blank" rel="noreferrer">klik disini</a>.
                </ListItem>
                <ListItem>
                Masukkan User ID dan Password.
                </ListItem>
                <ListItem>
                Pilih menu “Transfer”
                </ListItem>
                <ListItem>
                Pilih “Virtual Account Billing”.
                </ListItem>
                <ListItem>
                Kemudian masukan nomor Virtual Account Anda (<strong>{virtualAccount}</strong>) yang hendak dibayarkan. Lalu pilih rekening debet yang akan digunakan. Kemudian tekan “lanjut”
                </ListItem>
                <ListItem>
                Periksa ulang mengenai transaksi yang anda ingin lakukan
                </ListItem>
                <ListItem>
                Masukkan Kode Otentikasi Token.
                </ListItem>
                <ListItem>
                Pembayaran Anda berhasil
                </ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </>
    )
  }
  if (code === 'BRI') {
    return (
      <>
        <Accordion allowToggle mt="6" className="ol-accordion">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                ATM
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList>
                <ListItem>
                Pilih menu Transaksi Lain
                </ListItem>
                <ListItem>
                Pilih menu Lainnya
                </ListItem>
                <ListItem>
                Pilih menu Pembayaran
                </ListItem>
                <ListItem>
                Pilih menu Lainnya
                </ListItem>
                <ListItem>
                Pilih menu BRIVA
                </ListItem>
                <ListItem>
                Masukkan Nomor BRI Virtual Account (<strong>{virtualAccount}</strong>), lalu tekan “Benar”
                </ListItem>
                <ListItem>
                Konfirmasi pembayaran, tekan “Ya” bila sesuai
                </ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
              Mobile Banking
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList>
                <ListItem>
              Log in ke Mobile Banking
                </ListItem>
                <ListItem>
              Pilih menu Pembayaran
                </ListItem>
                <ListItem>
              Pilih menu BRIVA
                </ListItem>
                <ListItem>
              Masukkan nomor BRI Virtual Account (<strong>{virtualAccount}</strong>) dan jumlah pembayaran
                </ListItem>
                <ListItem>
              Masukkan nomor PIN anda
                </ListItem>
                <ListItem>
              Tekan “OK” untuk melanjutkan transaksi
                </ListItem>
                <ListItem>
              Transaksi berhasil
                </ListItem>
                <ListItem>
              SMS konfirmasi akan masuk ke nomor telepon anda
                </ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
              Internet Banking
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <OrderedList>
                <ListItem>
              Masukan User ID dan Password
                </ListItem>
                <ListItem>
              Pilih menu Pembayaran
                </ListItem>
                <ListItem>
              Pilih menu BRIVA
                </ListItem>
                <ListItem>
              Pilih rekening Pembayar
                </ListItem>
                <ListItem>
              Masukkan Nomor Virtual Account BRI Anda (<strong>{virtualAccount}</strong>)
                </ListItem>
                <ListItem>
              Masukkan nominal yang akan dibayar
                </ListItem>
                <ListItem>
              Masukkan password dan Mtoken anda
                </ListItem>
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </>
    )
  }
  if (code === 'PERMATA') {
    return (
      <Accordion allowToggle mt="6" className="ol-accordion">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              ATM PRIMA / ALTO:
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <OrderedList>
              <ListItem>
              Pada menu utama, pilih transaksi lain
              </ListItem>
              <ListItem>
              Pilih Pembayaran Transfer
              </ListItem>
              <ListItem>
              Pilih pembayaran lainnya
              </ListItem>
              <ListItem>
              Pilih pembayaran Virtual Account
              </ListItem>
              <ListItem>
              Masukkan nomor virtual account anda (<strong>{virtualAccount}</strong>)
              </ListItem>
              <ListItem>
              Pada halaman konfirmasi, akan muncul nominal yang dibayarkan, nomor, dan nama merchant, lanjutkan jika sudah sesuai
              </ListItem>
              <ListItem>
              Pilih sumber pembayaran anda dan lanjutkan
              </ListItem>
              <ListItem>
              Transaksi anda selesai
              </ListItem>
              <ListItem>
              Ketika transaksi anda sudah selesai, invoice anda akan diupdate secara otomatis. Ini mungkin memakan waktu hingga 5 menit.
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Permata Mobile X
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <OrderedList>
              <ListItem>
              Buka Permata Mobile X dan Login
              </ListItem>
              <ListItem>
              Pilih Pay &quot;Pay Bills&quot;/ &quot;Pembayaran Tagihan&quot;
              </ListItem>
              <ListItem>
              Pilih “Virtual Account”
              </ListItem>
              <ListItem>
              Masukkan Nomor Virtual Account anda (<strong>{virtualAccount}</strong>)
              </ListItem>
              <ListItem>
              Detail pembayaran anda akan muncul di layar
              </ListItem>
              <ListItem>
              Nominal yang ditagihkan akan muncul di layar. Pilih sumber pembayaran
              </ListItem>
              <ListItem>
              Konfirmasi transaksi anda
              </ListItem>
              <ListItem>
              Masukkan kode response token anda
              </ListItem>
              <ListItem>
              Transaksi anda telah selesai
              </ListItem>
              <ListItem>
              Ketika transaksi anda sudah selesai, invoice anda akan diupdate secara otomatis. Ini mungkin memakan waktu hingga 5 menit.
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Permata Mobile
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <OrderedList>
              <ListItem>
              Buka Permata Mobile dan Login
              </ListItem>
              <ListItem>
              Pilih Pay &quot;Pay Bills&quot;/ &quot;Pembayaran Tagihan&quot;
              </ListItem>
              <ListItem>
              Pilih menu “Transfer”
              </ListItem>
              <ListItem>
              Pilih sumber pembayaran
              </ListItem>
              <ListItem>
              Pilih “daftar tagihan baru”
              </ListItem>
              <ListItem>
              Masukan nomor Virtual Account Anda (<strong>{virtualAccount}</strong>)
              </ListItem>
              <ListItem>
              Periksa ulang mengenai transaksi yang anda ingin lakukan
              </ListItem>
              <ListItem>
              Konfirmasi transaksi anda
              </ListItem>
              <ListItem>
              Masukkan SMS token respons
              </ListItem>
              <ListItem>
              Pembayaran Anda berhasil
              </ListItem>
              <ListItem>
              Ketika transaksi anda sudah selesai, invoice anda akan diupdate secara otomatis. Ini mungkin memakan waktu hingga 5 menit.
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              Internet Banking Permata (PermataNet)
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <OrderedList>
              <ListItem>
              Buka situs https://new.permatanet.com atau
                <a href="https://new.permatanet.com" target="_blank" rel="noreferrer">klik disini</a>
              dan login
              </ListItem>
              <ListItem>
              Pilih menu “pembayaran”.
              </ListItem>
              <ListItem>
              Pilih menu “Pembayaran Tagihan”.
              </ListItem>
              <ListItem>
              Pilih “Virtual Account”
              </ListItem>
              <ListItem>
              Pilih sumber pembayaran
              </ListItem>
              <ListItem>
              Pilih menu &quot;Masukkan Daftar Tagihan Baru&quot;
              </ListItem>
              <ListItem>
              Masukan nomor Virtual Account Anda (<strong>{virtualAccount}</strong>)
              </ListItem>
              <ListItem>
              Konfirmasi transaksi anda
              </ListItem>
              <ListItem>
              Masukkan SMS token response
              </ListItem>
              <ListItem>
              Pembayaran Anda berhasil
              </ListItem>
              <ListItem>
              Ketika transaksi anda sudah selesai, invoice anda akan diupdate secara otomatis. Ini mungkin memakan waktu hingga 5 menit
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  }

  if (code === 'BCA') {
    return (
      <Accordion allowToggle mt="6" className="ol-accordion">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              ATM
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <OrderedList>
              <ListItem>
              Masukkan kartu ATM dan PIN BCA Anda
              </ListItem>
              <ListItem>
              Di menu utama, pilih &quot;Transaksi Lainnya&quot;. Pilih &quot;Transfer&quot;. Pilih &quot;Ke BCA Virtual Account&quot;
              </ListItem>
              <ListItem>
              Masukkan nomor Virtual Account <strong>{virtualAccount}</strong>
              </ListItem>
              <ListItem>
              Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih &quot;Benar&quot;
              </ListItem>
              <ListItem>
              Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih &quot;Ya&quot;, atau pilih &quot;Tidak&quot; jika data di layar masih salah
              </ListItem>
              <ListItem>
              Transaksi Anda sudah selesai. Pilih &quot;Tidak&quot; untuk tidak melanjutkan transaksi lain
              </ListItem>
              <ListItem>
              Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              IBanking
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <OrderedList>
              <ListItem>
                Login ke KlikBCA Individual
              </ListItem>
              <ListItem>
                Pilih &quot;Transfer&quot;, kemudian pilih &quot;Transfer ke BCA Virtual Account&quot;
              </ListItem>
              <ListItem>
                Masukkan nomor Virtual Account <strong>{virtualAccount}</strong>
              </ListItem>
              <ListItem>
                Pilih &quot;Lanjutkan&quot; untuk melanjutkan pembayaran
              </ListItem>
              <ListItem>
                Masukkan &quot;RESPON KEYBCA APPLI 1&quot; yang muncul pada Token BCA Anda, lalu klik tombol &quot;Kirim&quot;
              </ListItem>
              <ListItem>
                Transaksi Anda sudah selesai
              </ListItem>
              <ListItem>
                Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
              BCA M-Mobile
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <OrderedList>
              <ListItem>
                Buka Aplikasi BCA Mobile
              </ListItem>
              <ListItem>
                Pilih &quot;m-BCA&quot;, kemudian pilih &quot;m-Transfer&quot;
              </ListItem>
              <ListItem>
                Pilih &quot;BCA Virtual Account&quot;
              </ListItem>
              <ListItem>
                Masukkan nomor Virtual Account <strong>{virtualAccount}</strong>, lalu pilih &quot;OK&quot;
              </ListItem>
              <ListItem>
                Klik tombol &quot;Send&quot; yang berada di sudut kanan atas aplikasi untuk melakukan transfer
              </ListItem>
              <ListItem>
                Klik &quot;OK&quot; untuk melanjutkan pembayaran
              </ListItem>
              <ListItem>
                Masukkan PIN Anda untuk meng-otorisasi transaksi
              </ListItem>
              <ListItem>
                Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
              </ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  }
  return <></>
}

const PaymentGuideQris = () => {
  return (
    <>
      <Text fontWeight="bold" fontSize="lg">Cara bayar dengan QRIS</Text>
      <OrderedList marginTop="4">
        <ListItem>Tekan tombol {`"Download QRIS"`} untuk mengunduh gambar QRIS.</ListItem>
        <ListItem>Buka aplikasi e-Wallet atau e-Banking. yang menyediakan pembayaran QRIS.</ListItem>
        <ListItem>Cari opsi scan QRIS dari gambar. Pilih gambar QRIS yang sebelumnya.</ListItem>
        <ListItem>Setelah discan, maka akan muncul total harga transaksi.</ListItem>
        <ListItem>Konfirmasi dan bayar.</ListItem>
        <ListItem>Anda berhasil membayar pesanan.</ListItem>
      </OrderedList>
    </>
  )
}

export {
  PaymentGuideVA,
  PaymentGuideQris
}
