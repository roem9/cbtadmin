// ketika menekan tombol simpan pada modal tambah barang 
$("#btnAddBarang").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menambahkan barang?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let tgl_rilis = $("#tgl_rilis_add").val();
            let nama_barang = $("#nama_barang_add").val();
            let kode_barang = $("#kode_barang_add").val();
            let harga = $("#harga_add").val();
            let bagi_hasil = $("#bagi_hasil_add").val();
            
            if(tgl_rilis == "" || nama_barang == "" || kode_barang == "" || harga == "" || bagi_hasil == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Gagal menambahkan data barang, lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {tgl_rilis: tgl_rilis, nama_barang: nama_barang, kode_barang: kode_barang, harga: harga, bagi_hasil: bagi_hasil}
                let result = ajax(url_base+"barang/add_barang", "POST", data);

                if(result == 1){
                    reload_data();
                    $("#formAddBarang").trigger("reset");

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil menambahkan data barang',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'terjadi kesalahan, ulangi input barang'
                    })
                }
            }
        }
    })
})

// ketika menekan tombol edit barang 
$(document).on("click",".btnEditBarang", function(){
    let id_barang = $(this).data("id");
    let data = {id_barang: id_barang};
    let result = ajax(url_base+"barang/get_barang", "POST", data);
    
    $("#nama_barang_edit").val(result.nama_barang);
    $("#kode_barang_edit").val(result.kode_barang);
    $("#tgl_rilis_edit").val(result.tgl_rilis);
    $("#harga_edit").val(formatRupiah(result.harga, 'Rp. '));
    $("#bagi_hasil_edit").val(formatRupiah(result.bagi_hasil, 'Rp. '));
    $("#id_barang_edit").val(result.id_barang);
})

// ketika menyimpan hasil edit barang 
$("#btnEditBarang").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan merubah data barang?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let id_barang = $("#id_barang_edit").val();
            let tgl_rilis = $("#tgl_rilis_edit").val();
            let nama_barang = $("#nama_barang_edit").val();
            let kode_barang = $("#kode_barang_edit").val();
            let harga = $("#harga_edit").val();
            let bagi_hasil = $("#bagi_hasil_edit").val();
            
            if(tgl_rilis == "" || nama_barang == "" || kode_barang == "" || harga == "" || bagi_hasil == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Gagal merubah data barang, lengkapi isi form terlebih dahulu'
                })
            } else {
                data = {id_barang: id_barang, tgl_rilis: tgl_rilis, nama_barang: nama_barang, kode_barang: kode_barang, harga: harga, bagi_hasil: bagi_hasil}
                let result = ajax(url_base+"barang/edit_barang", "POST", data);

                if(result == 1){
                    reload_data();
                    $("#formAddBarang").trigger("reset");

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil merubah data barang',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'terjadi kesalahan'
                    })
                }
            }
        }
    })
})

// ketika menghapus data barang 
$(document).on("click", ".btnHapusBarang", function(){
    let data = $(this).data("id");
    data = data.split("|");
    let id_barang = data[0];
    let nama_barang = data[1];

    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menghapus data barang '+nama_barang+'?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            data = {id_barang: id_barang}
            let result = ajax(url_base+"barang/hapus_barang", "POST", data);

            if(result == 1){
                reload_data();

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Berhasil menghapus data barang',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'terjadi kesalahan, gagal menghapus data barang'
                })
            }
        }
    })
})
