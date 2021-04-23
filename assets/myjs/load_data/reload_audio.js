reload_data();

// untuk meload data audio
function reload_data(){
    let result = ajax(url_base+"audio/ajax_list_audio", "POST", "");

    html = `<div class="card">`;

    if(result.length != 0){
        let i = 1;
        result.forEach(data => {
            html += `
            <div class="list-group card-list-group">
                <div class="list-group-item">
                    <div class="row g-2 align-items-center">
                        <div class="col-auto text-h3">
                        `+i+`
                        </div>
                        <div class="col-auto">
                        <img src="`+url_base+`assets/tabler-icons-1.39.1/icons/file-music.svg" class="rounded" alt="Górą ty" width="40" height="40">
                        </div>
                        <div class="col">
                        `+data.nama_audio+`
                        </div>
                        <div class="col-auto d-none d-sm-block">
                            <audio controls>
                                <source src="`+url_base+`assets/myaudio/`+data.nama_file+`" type="audio/mpeg">
                            </audio>
                        </div>
                        <div class="col-auto lh-1">
                        <div class="dropdown">
                            <a href="#" class="link-secondary" data-bs-toggle="dropdown">
                                <svg width="24" height="24">
                                    <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-settings" />
                                </svg>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item editAudio" data-bs-toggle="modal" href="#editAudio" data-id="`+data.id_audio+`">
                                Edit
                            </a>
                            <a class="dropdown-item hapusAudio" data-id="`+data.id_audio+`">
                                Hapus
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="mt-3 text-center d-block d-sm-none">
                        <audio controls>
                            <source src="`+url_base+`assets/myaudio/`+data.nama_file+`" type="audio/mpeg">
                        </audio>
                    </div>
                </div>
            </div>`;
            i++;
        });

        html += `</div>`;
    } else {
        html = `
        <div class="d-flex flex-column justify-content-center">
            <div class="empty">
                <div class="empty-img"><img src="`+url_base+`assets/static/illustrations/undraw_printing_invoices_5r4r.svg" height="128"  alt="">
                </div>
                <p class="empty-title">Data kosong</p>
                <p class="empty-subtitle text-muted">
                    Silahkan tambahkan data
                </p>
            </div>
        </div>`;
    }

    $("#dataAjax").html(html);
    $("#skeleton").hide();
    
}


{/* <div class="card">
<div class="list-group card-list-group">
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        1
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/a4fb1d293bd8d3fd38352418c50fcf1369a7a87d.jpg" class="rounded" alt="Górą ty" width="40" height="40">
        </div>
        <div class="col">
        Górą ty
        <div class="text-muted">
            GOLEC UORKIESTRA,
            Gromee,
            Bedoes
        </div>
        </div>
        <div class="col-auto text-muted">
        03:41
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        2
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/f04bb6fba32e89475d9981007aff21e13745dec2.jpg" class="rounded" alt="High Life" width="40" height="40">
        </div>
        <div class="col">
        High Life
        <div class="text-muted">
            Daft Punk
        </div>
        </div>
        <div class="col-auto text-muted">
        03:21
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        3
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/c3f13b4f7a674abda9aa36fd72fa341e918c0f26.jpg" class="rounded" alt="Houdini" width="40" height="40">
        </div>
        <div class="col">
        Houdini
        <div class="text-muted">
            Foster The People
        </div>
        </div>
        <div class="col-auto text-muted">
        03:23
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        4
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/4d4ab714dfca7b9df41d4a02a2c39394ebdeb6b6.jpg" class="rounded" alt="Safe And Sound" width="40" height="40">
        </div>
        <div class="col">
        Safe And Sound
        <div class="text-muted">
            Capital Cities
        </div>
        </div>
        <div class="col-auto text-muted">
        03:12
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        5
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/79b2422b467ad20c07576e8f8f5f2f1692ac7142.jpg" class="rounded" alt="Partied Out" width="40" height="40">
        </div>
        <div class="col">
        Partied Out
        <div class="text-muted">
            Con Bro Chill
        </div>
        </div>
        <div class="col-auto text-muted">
        03:17
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        6
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/aac97056fc02fe02c7e95f7ff77a07c6e82f7d6e.jpg" class="rounded" alt="Runaway (U &amp; I)" width="40" height="40">
        </div>
        <div class="col">
        Runaway (U & I)
        <div class="text-muted">
            Galantis
        </div>
        </div>
        <div class="col-auto text-muted">
        03:47
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        7
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/859337f0eaa49b1ad6ed76719b7c1ae26d6412c8.jpg" class="rounded" alt="Light It Up (feat. Nyla &amp; Fuse ODG) - Remix" width="40" height="40">
        </div>
        <div class="col">
        Light It Up (feat. Nyla & Fuse ODG) - Remix
        <div class="text-muted">
            Major Lazer,
            Nyla,
            Fuse ODG
        </div>
        </div>
        <div class="col-auto text-muted">
        02:46
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        8
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/2e7357491deb8a6796ee8d9181ca9ea1f407bb5f.jpg" class="rounded" alt="Hangover" width="40" height="40">
        </div>
        <div class="col">
        Hangover
        <div class="text-muted">
            Taio Cruz,
            Flo Rida
        </div>
        </div>
        <div class="col-auto text-muted">
        04:04
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        9
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/c976bfc96d5e44820e553a16a6097cd02a61fd2f.jpg" class="rounded" alt="Shape of You" width="40" height="40">
        </div>
        <div class="col">
        Shape of You
        <div class="text-muted">
            Ed Sheeran
        </div>
        </div>
        <div class="col-auto text-muted">
        03:53
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        10
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/c9a8350feee77e9345eec4155cddc96694803d1a.jpg" class="rounded" alt="Alone" width="40" height="40">
        </div>
        <div class="col">
        Alone
        <div class="text-muted">
            Alan Walker
        </div>
        </div>
        <div class="col-auto text-muted">
        02:41
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        11
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/fe4ee21d30450829e5b172e806b3c1e14ca1e5f3.jpg" class="rounded" alt="Langrennsfar" width="40" height="40">
        </div>
        <div class="col">
        Langrennsfar
        <div class="text-muted">
            Ylvis
        </div>
        </div>
        <div class="col-auto text-muted">
        02:43
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="list-group-item">
    <div class="row g-2 align-items-center">
        <div class="col-auto text-h3">
        12
        </div>
        <div class="col-auto">
        <img src="<?= base_url()?>assets/static/tracks/f4e96086f44c4dff1758b1fc1338cd88c1b5ce9c.jpg" class="rounded" alt="Skibidi - Romantic Edition" width="40" height="40">
        </div>
        <div class="col">
        Skibidi - Romantic Edition
        <div class="text-muted">
            Little Big
        </div>
        </div>
        <div class="col-auto text-muted">
        03:12
        </div>
        <div class="col-auto">
        <a href="#" class="link-secondary">
            <button class="switch-icon" data-bs-toggle="switch-icon">
            <span class="switch-icon-a text-muted">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            <span class="switch-icon-b text-red">
                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
            </span>
            </button>
        </a>
        </div>
        <div class="col-auto lh-1">
        <div class="dropdown">
            <a href="#" class="link-secondary" data-bs-toggle="dropdown"><!-- Download SVG icon from http://tabler-icons.io/i/dots -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">
                Action
            </a>
            <a class="dropdown-item" href="#">
                Another action
            </a>
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
</div> */}