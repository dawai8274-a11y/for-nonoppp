# A Little World For You ♡

Starter project website ucapan romantis dengan karakter 3D interaktif.

## Prasyarat
- Node.js 20.9+ (disarankan Node.js 22 LTS)
- npm
- Antigravity (opsional, untuk pengembangan dengan AI)

## Menjalankan proyek
```bash
npm install
npm run dev
```
Buka http://localhost:3000

Build produksi:
```bash
npm run build
npm start
```

## Aset yang wajib ditambahkan
Letakkan model karakter 3D di:
`public/models/nailong.glb`

Model harus:
- Format GLB/GLTF.
- Memiliki rig/skeleton.
- Memiliki animation clips dengan nama yang disarankan: Idle, Blink, Walk, Run, Wave, Jump, Dance, Sit, Hug.
- Memiliki lisensi/hak penggunaan yang mengizinkan penggunaan pada website.

Musik:
- `public/audio/background.mp3`
- Opsional: `public/audio/footsteps.mp3`, `public/audio/pop.mp3`

Foto:
- `public/images/memory-01.jpg`
- `public/images/memory-02.jpg`
- `public/images/memory-03.jpg`

Hapus placeholder dan masukkan foto yang memang ingin dibagikan. Pastikan mendapat izin dari orang yang ada di foto.

## Penting
Saat ini komponen 3D memuat `/models/nailong.glb`. File model tidak disertakan karena harus menggunakan aset yang legal dan sesuai rig/animasi. Tanpa file tersebut, scene 3D akan menampilkan error pemuatan aset. Tambahkan model sebelum pengujian final.

## Personalisasi
- Ubah isi surat di `src/data/memories.ts`.
- Ubah kartu memori di `src/data/memories.ts`.
- Ubah warna dan gaya di `src/app/globals.css`.
- Ubah adegan dan animasi di `src/components`.

## Catatan performa
Starter ini menggunakan React Three Fiber dan membatasi DPR ke 1–1.5. Untuk perangkat low-end, gunakan model low-poly, tekstur 1K atau lebih kecil, kompresi Draco/KTX2 bila pipeline sudah disiapkan, dan hindari banyak lampu/shadow real-time.