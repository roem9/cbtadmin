var page = "";
        
// Detect pagination click
$('#pagination').on('click','a',function(e){
    e.preventDefault(); 
    var pageno = $(this).attr('data-ci-pagination-page');
    loadPagination(pageno);

    page = pageno;
});

loadPagination(0);

// Load pagination
function loadPagination(pagno){
    let result = ajax(url_base+"pengambilan/loadRecord/"+pagno, "POST", "");

    if(result.total_rows != 0) {
        
        if(result.result.length != 0){
            
            $('#pagination').html(result.pagination);
            createTable(result.result,result.row);

        } else {
            
            pageback = pagno - 1;
            let result = ajax(url_base+"pengambilan/loadRecord/"+pageback, "POST", "");

            if(result.result.length != 0){
            
                $('#pagination').html(result.pagination);
                createTable(result.result,result.row);

            } else {
                
                pagenext = pagno + 1;
                let result = ajax(url_base+"pengambilan/loadRecord/"+pagnext, "POST", "");

                if(result.result.length != 0){
                
                    $('#pagination').html(result.pagination);
                    createTable(result.result,result.row);

                } else {
                    
                    html = `<div class="col-12"><div class="alert alert-warning"><i class="fa fa-exclamation-circle text-warning mr-1"></i>Data pengambilan kosong</div></div>`
                    $("#dataAjax").html(html);
                
                }

            }

        }

    } else {
        html = `<div class="col-12"><div class="alert alert-warning"><i class="fa fa-exclamation-circle text-warning mr-1"></i>Data pengambilan kosong</div></div>`
        $("#dataAjax").html(html);

    }
    
}

// Create table list
function createTable(data,sno){

    sno = Number(sno);

    html = "";

    for(index in data){
        if(data[index].status == "Selesai"){
            status = `
            <div class="list-group-item-success card-header py-3 d-flex flex-row align-items-center justify-content-between">    
                <h6 class="m-0 font-weight-bold text-dark"><i class="fa fa-check-circle text-success mr-1"></i>Selesai</h6>`

            pengambilan = ``;
        } else {
            status = `
            <div class="list-group-item-warning card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-dark"><i class="fa fa-exclamation-circle text-warning mr-1"></i>Proses</h6>`
            
            // button pengambilan 
            pengambilan = `<div class="d-flex justify-content-center mt-1">
                <a href="#addPengambilan" data-toggle="modal" data-id="`+data[index].id_pengiriman+`" class="btn btn-circle btn-warning mr-1 btnAddPengambilan"><i class="fa fa-hand-holding-usd"></i></a>
            </div>`;
        }

        html += `
        <div class="col-12 col-md-4">
            <div class="card shadow mb-4">
                
                    `+status+`
                    <div class="dropdown no-arrow">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">Pengiriman</div>
                            <a class="dropdown-item btnDetailPengiriman" href="#detailPengiriman" data-id="`+data[index].id_pengiriman+`" data-toggle="modal">Detail</a>
                            <a class="dropdown-item btnEditPengiriman" href="#editPengiriman" data-toggle="modal" data-id="`+data[index].id_pengiriman+`">Edit</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item bthHapusPengiriman" href="javascript:void(0)" data-id="`+data[index].id_pengiriman+`">Hapus</a>
                        </div>
                    </div>
                </div>
                <div class="card-body text-gray-900">
                    <p><i class="fa fa-store mr-3"></i>`+data[index].nama_toko+` </p>
                    <p><i class="fa fa-map-marker-alt mr-4"></i>`+data[index].alamat+` </p>
                    <p><i class="fa fa-map-signs mr-3"></i>`+data[index].kecamatan+` </p>
                    <p><i class="fa fa-truck mr-3"></i>`+data[index].tgl_pengiriman+`</p>
                    <p><i class="fa fa-truck-pickup fa-flip-horizontal mr-3"></i>`+data[index].tgl_pengambilan+`</p>
                    `+pengambilan+`
                </div>
            </div>
        </div>`;
    }

    $("#dataAjax").html(html);

};



// edited soon 
// edit pengiriman 
function data_edit_pengiriman(id_pengiriman){
                
    let data = {id_pengiriman:id_pengiriman};

    let result = ajax(url_base+"toko/get_detail_pengiriman", "POST", data);

    // console.log(result);

    $("#id_pengiriman_edit").val(result.pengiriman.id_pengiriman);
    $(".nama_toko_edit_pengiriman").val(result.pengiriman.nama_toko);
    $("#tgl_pengiriman_edit").val(result.pengiriman.tgl_pengiriman_format);
    $("#tgl_pengambilan_edit").val(result.pengiriman.tgl_pengambilan_format);

    html = "";
    i = 1;

    if(result.detail_pengiriman.length != 0){
        
        result.detail_pengiriman.forEach(data => {
            
            html += `
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text">`+i+`. `+data.kode_barang+`</span>
                </div>
                <input type="hidden" name="id_detail_edit" value="`+data.id+`">
                <input type="number" name="qty_edit" class="form-control" value="`+data.kirim+`" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-prepend">
                    <span class="input-group-text"><a href="javascript:void(0)" class="btnDeleteDetailPengiriman" data-id="`+data.id+`|`+data.id_pengiriman+`|`+data.nama_barang+`"><i class="fa fa-trash-alt text-danger"></i></a></span>
                </div>                   
            </div>
            
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text">Harga</span>
                </div>
                <input type="text" name="harga_jual_edit" class="form-control rupiah" aria-label="Amount (to the nearest dollar)" value="`+formatRupiah(data.harga, 'Rp. ')+`">
            </div>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">BH</span>
                </div>
                <input type="text" name="bh_edit" class="form-control rupiah" aria-label="Amount (to the nearest dollar)" value="`+formatRupiah(data.bagi_hasil, 'Rp. ')+`">
            </div>`;

            i++;
        });

    } else {
        html += `<div class="alert alert-warning"><i class="fa fa-exclamation-circle text-warning"></i>list barang kosong</div>`
    }

    $("#editPengirimanBarang").html(html);

    result = ajax(url_base+"toko/get_all_barang_belum_dikirim", "POST", data);

    html = "";
    if(result.length != 0){
        result.forEach(data => {
            html += `
                <div class="form-group text-gray-900">
                    <div class="custom-control custom-checkbox small">
                        <input type="checkbox" name="barang" value="`+data.id_barang+`|`+data.kode_barang+`|`+data.harga+`|`+data.bagi_hasil+`" class="custom-control-input" id="`+data.id_barang+`">
                        <label class="custom-control-label" for="`+data.id_barang+`">`+data.nama_barang+`</label>
                    </div>
                </div>`
        });
    } else {
        html += `
            <div class="alert alert-warning"><i class="fa fa-exclamation-circle text-warning mr-1"></i>list barang kosong</div>`
    }

    $("#editPengirimanTambahList").html(html)

}

// when detail pengiriman click
$(document).on("click", ".btnDetailPengiriman", function(){
    let id_pengiriman = $(this).data("id");
    // console.log(id_pengiriman)
    let data = {id_pengiriman:id_pengiriman};

    let result = ajax(url_base+"toko/get_detail_pengiriman", "POST", data);
    
    html = "";
    
    html += `
        <li class="list-group-item list-group-item-info"><i class="fa fa-mail mr-1"></i>Data Pengiriman</li>
        <li class="list-group-item">
            <p><i class="fa fa-store mr-3"></i>`+result.pengiriman.nama_toko+`</p>
            <p><i class="fa fa-info-circle mr-3"></i>`+result.pengiriman.status+`</p>
            <p><i class="fa fa-truck mr-3"></i>`+result.pengiriman.tgl_pengiriman+`</p>
            <p><i class="fa fa-truck-pickup fa-flip-horizontal mr-3"></i>`+result.pengiriman.tgl_pengambilan+`</p>
        </li>`

    $(".detailPengirimanData").html(html);

    
    html = "";
    if(result.detail_pengiriman.length != 0){
        i = 1;
        result.detail_pengiriman.forEach(data => {
            if(result.pengiriman.status == "Selesai") {
                kembali = `<i class="fa fa-truck-pickup fa-flip-horizontal mr-3"></i>`+data.kembali;
            } else {
                kembali = `<i class="fa fa-truck-pickup fa-flip-horizontal mr-3"></i>-`;
            }

            html += `
                <li class="list-group-item list-group-item-primary d-flex justify-content-between">
                    <span>`+i+`. `+data.kode_barang+`</span>
                    <span>
                        <i class="fa fa-truck mr-3"></i>`+data.kirim+`
                    </span>
                    <span>
                        `+kembali+`
                    </span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span><i class="fa fa-dollar-sign mr-1"></i>`+formatRupiah(data.harga, "Rp. ")+`</span>
                    <span>
                        <i class="fa fa-handshake mr-1"></i>`+formatRupiah(data.bagi_hasil, "Rp. ")+`
                    </span>
                </li>`
                
            i++;

        });
    } else {
        html += `

        `
    }

    $(".detailPengirimanListBarang").html(html);
})

// when edit pengiriman click
$(document).on("click", ".btnEditPengiriman", function(){
    
    // button form
    $(".btn-form-1").addClass("active");
    $(".btn-form-2").removeClass("active");
    $(".btn-form-3").removeClass("active");

    // form
    $(".form-1").show();
    $(".form-2").hide();
    $(".form-3").hide();

    // footer
    $(".footer-1").show();
    $(".footer-2").hide();
    $(".footer-3").hide();

    $(".footer-3-1").hide();
    
    let id_pengiriman = $(this).data("id");

    data_edit_pengiriman(id_pengiriman);

})

// when tombol simpan click in modal edit pengiriman 
$("#btnEditPengiriman").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan mengubah data pengiriman?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            let id_pengiriman = $("#id_pengiriman_edit").val();
            let tgl_pengiriman = $("#tgl_pengiriman_edit").val();
            let tgl_pengambilan = $("#tgl_pengambilan_edit").val();

            if(tgl_pengiriman == "" || tgl_pengambilan == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'lengkapi isi form terlebih dahulu'
                })
            } else {

                data = {id_pengiriman: id_pengiriman, tgl_pengiriman: tgl_pengiriman, tgl_pengambilan: tgl_pengambilan}
                let result = ajax(url_base+"toko/edit_pengiriman", "POST", data);

                if(result == 1){
                    // reload_data();

                    loadPagination(page)

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil mengubah data pengiriman',
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

// when tombol trash click in modal edit pengiriman barang 
$(document).on("click",".btnDeleteDetailPengiriman",function(){
    let data = $(this).data("id");
    data = data.split("|");

    let id = data[0];
    let id_pengiriman = data[1];
    let kode_barang = data[2]
    
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menghapus '+kode_barang+' dari pengiriman?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            data = {id: id}

            let result = ajax(url_base+"toko/delete_detail_pengiriman", "POST", data);

            if(result == 1){
                
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Berhasil menghapus barang dari pengiriman',
                    showConfirmButton: false,
                    timer: 1500
                })

                data_edit_pengiriman(id_pengiriman);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'terjadi kesalahan, gagal menghapus barang dari pengiriman'
                })
            }
        }
    })
})

// when tombol simpan edit barang click
$("#btnEditPengirimanBarang").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan mengubah detail barang pengiriman?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            id_pengiriman = $("#id_pengiriman_edit").val();

            id_detail = new Array();
            $.each($("input[name='id_detail_edit']"), function(){
                id_detail.push($(this).val());
            });
            
            // untuk cek jik ada qty yang 0
            let eror = 0;

            qty = new Array();
            $.each($("input[name='qty_edit']"), function(){
                qty.push($(this).val());

                if($(this).val() == 0 || $(this).val() == ""){
                    eror = 1;
                }

            });

            harga = new Array();
            $.each($("input[name='harga_jual_edit']"), function(){
                harga.push($(this).val());

                if($(this).val() == "Rp. 0" || $(this).val() == ""){
                    eror = 1;
                }

            });

            bh = new Array();
            $.each($("input[name='bh_edit']"), function(){
                bh.push($(this).val());

                if($(this).val() == ""){
                    eror = 1;
                }

            });

            if(eror == 0){
                data = {id_detail:id_detail, qty:qty, harga:harga, bh:bh}
                let result = ajax(url_base+"toko/edit_barang_pengiriman", "POST", data);

                if(result == 1){
                    data_edit_pengiriman(id_pengiriman);
                    $("#addPengiriman").modal("hide");

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil mengubah detail pengiriman barang',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'terjadi kesalahan, ulangi proses input'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'inputkan jumlah barang, jumlah barang tidak boleh 0 atau kosong'
                })
            }
            
        }
    })
})

// when tombol delete pengiriman click 
$(document).on("click", ".bthHapusPengiriman", function(){
    let id_pengiriman = $(this).data("id");

    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menghapus data pengiriman?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            data = {id_pengiriman: id_pengiriman}
            let result = ajax(url_base+"toko/hapus_pengiriman", "POST", data);

            if(result == 1){
                // reload_data();
                loadPagination(page)

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Berhasil menghapus data pengiriman',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'terjadi kesalahan, gagal menghapus data pengiriman'
                })
            }
        }
    })
})

// when button circle bg warning clicked
$(document).on("click", ".btnAddPengambilan", function(){
    let id_pengiriman = $(this).data("id");
    // console.log(id_pengiriman)
    let data = {id_pengiriman:id_pengiriman};

    let result = ajax(url_base+"toko/get_detail_pengiriman", "POST", data);

    // console.log(result);
    
    $("#id_pengiriman_pengambilan").val(result.pengiriman.id_pengiriman)
    $("#nama_toko_pengambilan").val(result.pengiriman.nama_toko)
    $("#tgl_pengiriman_pengambilan").val(result.pengiriman.tgl_pengiriman)
    $("#tgl_pengambilan_pengambilan").val(result.pengiriman.tgl_pengambilan)
    
    i = 1;
    html = "";
    result.detail_pengiriman.forEach(data => {
        
        html += `<div class="input-group input-group-sm mb-1">
            <div class="input-group-prepend">
                <span class="input-group-text">`+i+`. `+data.kode_barang+` (`+data.kirim+`)</span>
            </div>
            <input type="hidden" name="id_detail" value="`+data.id+`">
            <input type="number" name="qty_kembali" class="form-control" value="0" aria-label="Amount (to the nearest dollar)">
        </div>`

        i++;
    });
    
    $(".addPengambilanListBarang").html(html);
})

// when tombol simpan click in modal add pengambilan 
$("#btnAddPengambilan").click(function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menginputkan data pengambilan?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {
            id_pengiriman = $("#id_pengiriman_pengambilan").val();

            id_detail = new Array();
            $.each($("input[name='id_detail']"), function(){
                id_detail.push($(this).val());
            });
            
            // untuk cek jik ada qty yang 0
            let eror = 0;

            qty = new Array();
            $.each($("input[name='qty_kembali']"), function(){
                qty.push($(this).val());

                if($(this).val() == ""){
                    eror = 1;
                }

            });

            if(eror == 0){
                data = {id_pengiriman:id_pengiriman, id_detail:id_detail, qty:qty}
                let result = ajax(url_base+"toko/add_pengambilan", "POST", data);

                if(result == 1){
                    // reload_data();

                    loadPagination(page)

                    $("#addPengambilan").modal("hide");

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil menginputkan pengambilan',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'terjadi kesalahan, ulangi proses input'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'inputkan jumlah barang, jumlah barang tidak boleh kosong'
                })
            }
        }
    })
})

// when tombol kirim click in modal edit pengiriman
$(document).on("click", "#btnEditPengirimanTambah", function(){
    var atLeastOneIsChecked = $('input[name="barang"]:checked').length;
    if(atLeastOneIsChecked == 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'pilih barang yang akan ditambahkan terlebih dahulu'
        })
    } else {
        let i = 1;
        html = "";
        $.each($("input[name='barang']:checked"), function(){
            data = $(this).val();
            data = data.split("|");
            id_barang = data[0];
            kode_barang = data[1];
            harga = data[2];
            bagi_hasil = data[3];
            
            html += `<div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text">`+i+`. `+kode_barang+`</span>
                </div>
                <input type="hidden" name="id_barang_pengiriman_tambah" value="`+id_barang+`">
                <input type="number" name="qty_tambah" class="form-control" aria-label="Amount (to the nearest dollar)" value="0">
            </div>
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text">Harga</span>
                </div>
                <input type="text" name="harga_jual_tambah" class="form-control rupiah" aria-label="Amount (to the nearest dollar)" value="`+formatRupiah(harga, "Rp. ")+`">
            </div>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">BH</span>
                </div>
                <input type="text" name="bh_tambah" class="form-control rupiah" aria-label="Amount (to the nearest dollar)" value="`+formatRupiah(bagi_hasil, "Rp. ")+`">
            </div>`;

            i++;
        });

        $("#editPengirimanTambahBarang").html(html);
        
        $("#editPengirimanTambahList").hide();
        $("#editPengirimanTambahBarang").show();
        
        $("#btnEditPengirimanTambah").hide();
        $(".footer-3").html(`
            <div class="modal-footer justify-content-between">
                <form action="" class="user">
                    <span>
                        <button type="button" class="btn btn-success btn-user" id="btnBarangEditPengiriman"><i class="fa fa-arrow-left mr-1"></i> barang</button>
                    </span>
                </form>
                <form action="" class="user">
                    <span>
                        <button type="button" class="btn btn-secondary btn-user" data-dismiss="modal">Tutup</button>
                        <button type="button" class="btn btn-primary btn-user" id="editPengirimanTambahSimpan">Simpan</button>
                    </span>
                </form>
            </div>
        `);
    }
})

// when tombol barang clicked 
$(document).on("click", "#btnBarangEditPengiriman", function(){
    $("#editPengirimanTambahList").show();
    $("#editPengirimanTambahBarang").hide();

    $(".footer-3").html(`
        <div class="modal-footer">
            <form action="" class="user">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-success btn-user" id="btnEditPengirimanTambah"><i class="fa fa-plus mr-1"></i> Tambah</button>
                </div>
            </form>
        </div>
    `);
})

// when tombol simpan click in modal edit pengiriman tambah barang
$(document).on("click", "#editPengirimanTambahSimpan", function(){
    Swal.fire({
        icon: 'question',
        text: 'Yakin akan menambahkan barang pada pengiriman ini?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
    }).then(function (result) {
        if (result.value) {

            let id_pengiriman = $("#id_pengiriman_edit").val();

            id_barang = new Array();
            $.each($("input[name='id_barang_pengiriman_tambah']"), function(){
                id_barang.push($(this).val());
            });
            
            // untuk cek jik ada qty yang 0
            let eror = 0;

            qty = new Array();
            $.each($("input[name='qty_tambah']"), function(){
                qty.push($(this).val());

                if($(this).val() == 0 || $(this).val() == ""){
                    eror = 1;
                }
            });

            harga = new Array();
            $.each($("input[name='harga_jual_tambah']"), function(){
                harga.push($(this).val());

                if($(this).val() == 0 || $(this).val() == ""){
                    eror = 1;
                }
            });
            
            bh = new Array();
            $.each($("input[name='bh_tambah']"), function(){
                bh.push($(this).val());

                if($(this).val() == 0 || $(this).val() == ""){
                    eror = 1;
                }
            });

            if(eror == 0){
                data = {id_pengiriman:id_pengiriman, id_barang:id_barang, qty:qty, harga:harga, bh:bh}
                let result = ajax(url_base+"toko/add_barang_pengiriman", "POST", data);

                if(result == 1){
        
                    // button form
                    $(".btn-form-1").removeClass("active");
                    $(".btn-form-2").addClass("active");
                    $(".btn-form-3").removeClass("active");

                    // form
                    $(".form-1").hide();
                    $(".form-2").show();
                    $(".form-3").hide();
                    
                    // footer
                    $(".footer-1").hide();
                    $(".footer-2").show();
                    $(".footer-3").hide();

                    data_edit_pengiriman(id_pengiriman);

                    
                    $("#editPengirimanTambahList").show()
                    $("#editPengirimanTambahBarang").hide()

                    $(".footer-3").html(`
                        <div class="modal-footer">
                            <form action="" class="user">
                                <div class="d-flex justify-content-end">
                                    <button type="button" class="btn btn-success btn-user" id="btnEditPengirimanTambah"><i class="fa fa-plus mr-1"></i> Tambah</button>
                                </div>
                            </form>
                        </div>
                    `);
                    

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'Berhasil menambahkan barang pengiriman',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'terjadi kesalahan, ulangi proses input'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'inputkan jumlah barang, jumlah barang tidak boleh 0 atau kosong'
                })
            }
        }
    })
})
// edit pengiriman 