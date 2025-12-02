# Patches
> [!Warning] This project is currently under active development.
> Features, design, and documentation may change frequently. Expect bugs, unfinished components, and placeholder content while development continues.

**Patches** is a minimal image sharing app, where users can add images called a *patch* or a bunch of images called a *patchwork*. This is then aggregated to main dashboard called a *quilt*.


## Main Features
- A more private form of sharing photos with people.
- No likes or share button
- Sharable profiles only with links
    - Embeddable links
- Quilt will have this kind of format "https://vsco.co/lily-flake-/gallery" where portrait photos are *Tall* and landscape photos are *short*


## Posible Headwinds
- Arranging flex boxes
- Process *portrait* to *long* photos, and *landscape* to *short* photos.
- Photos *metadata*:
    - Date
    - Resolution
    - tags
    - patchwork(Album)
- Embeddable links
- Register form
- Login form
- Landing page
    - Background a scrolling stock photos slowly.
- Storing of photos
    -  Google photos
    - S3 amazon bucket

## Tech stack
- MERN stack
    - express
    - React
    - MongoDB
- S3 amazon bucket

**Color Pallete**
- #3d5460  #f5efee #d7b7b7
