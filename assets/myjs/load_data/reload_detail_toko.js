reload_data();

// console.log(id_toko)

function reload_data(){
    let result = ajax(url_base+"toko/ajax_toko/"+id_toko, "POST", "");
    
    html = "";
    
    if(result.toko.hapus == 0){
        html += `
                <div class="col-12 col-md-4">
                    <div class="card shadow mb-4">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary"><i class="fa fa-building mr-1"></i>Profil Toko</h6>
                            <div class="dropdown no-arrow">
                                <a class="dropdown-toggle" href="javascript:void(0)" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right shadow animated-fade-in"
                                    aria-labelledby="dropdownMenuLink">
                                    <div class="dropdown-header">Data Toko</div>
                                    <a class="dropdown-item btnEditToko" href="#editToko" data-toggle="modal" data-id="`+result.toko.id_toko+`">Edit</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item btnHapusToko" href="javascript:void(0)" data-id="`+result.toko.id_toko+`|`+result.toko.nama_toko+`">Hapus</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body text-gray-900">
                            <p><i class="fa fa-user-circle mr-4"></i>`+result.toko.pj+`</p>
                            <p><i class="fa fa-phone mr-4"></i>`+result.toko.no_hp+`</p>
                            <p><i class="fa fa-map-marker-alt mr-4"></i>`+result.toko.alamat+`</p>
                            <p><i class="fa fa-map-signs mr-3"></i>`+result.toko.kecamatan+`</p>
                            <p><i class="fa fa-calendar-alt mr-4"></i>`+result.toko.tgl_bergabung+`</p>
                            <p><i class="fa fa-truck mr-3"></i>`+result.toko.pengiriman+` pengiriman </p>
                            <div class="d-flex justify-content-center mt-1">
                                <a href="#addPengiriman" data-toggle="modal" class="btn btn-circle btn-success mr-1 addPengiriman" data-id="`+result.toko.id_toko+`|`+result.toko.nama_toko+`"><i class="fa fa-truck"></i></a>
                            </div>
                        </div>
                    </div>
                </div>`;

        html += `<div class="col-12 mb-4">
            <h5 class="mb-0 text-gray-800">List Pengiriman</h5>
        </div>`;

        if(result.pengiriman.length != 0){
            result.pengiriman.forEach(data => {
                if(data.status == "Selesai"){
                    status = `
                    <div class="list-group-item-success card-header py-3 d-flex flex-row align-items-center justify-content-between">    
                        <h6 class="m-0 font-weight-bold text-dark"><i class="fa fa-check-circle text-success mr-1"></i>Selesai</h6>`

                    pengambilan = ``;

                    dropdown = `<a class="dropdown-item btnDetailPengiriman" href="#detailPengiriman" data-id="`+data.id_pengiriman+`" data-toggle="modal">Detail</a>`;
                } else {
                    status = `
                    <div class="list-group-item-warning card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-dark"><i class="fa fa-exclamation-circle text-warning mr-1"></i>Proses</h6>`
                    
                    // button pengambilan 
                    pengambilan = `<div class="d-flex justify-content-center mt-1">
                        <a href="#addPengambilan" data-toggle="modal" data-id="`+data.id_pengiriman+`" class="btn btn-circle btn-warning mr-1 btnAddPengambilan"><i class="fa fa-hand-holding-usd"></i></a>
                    </div>`;

                    dropdown = ` <a class="dropdown-item btnDetailPengiriman" href="#detailPengiriman" data-id="`+data.id_pengiriman+`" data-toggle="modal">Detail</a>
                        <a class="dropdown-item btnEditPengiriman" href="#editPengiriman" data-toggle="modal" data-id="`+data.id_pengiriman+`">Edit</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item bthHapusPengiriman" href="javascript:void(0)" data-id="`+data.id_pengiriman+`">Hapus</a>`
                }
                html += `<div class="col-12 col-md-4">
                    <div class="card shadow mb-4">
                        
                            `+status+`
                            <div class="dropdown no-arrow">
                                <a class="dropdown-toggle" href="javascript:void(0)" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                    <div class="dropdown-header">Pengiriman</div>
                                    `+dropdown+`
                                </div>
                            </div>
                        </div>
                        <div class="card-body text-gray-900">
                            <p><i class="fa fa-map-marker-alt mr-4"></i>`+data.alamat+` </p>
                            <p><i class="fa fa-map-signs mr-3"></i>`+data.kecamatan+`</p>
                            <p><i class="fa fa-truck mr-3"></i>`+data.tgl_pengiriman+`</p>
                            <p><i class="fa fa-truck-pickup fa-flip-horizontal mr-3"></i>`+data.tgl_pengambilan+`</p>
                            `+pengambilan+`
                        </div>
                    </div>
                </div>`;
            });
        } else {
            html += `<div class="col-12"><div class="alert alert-warning"><i class="fa fa-exclamation-circle text-warning mr-1"></i>Data pengiriman kosong</div></div>`
        }
    } else {
        html += `<div class="col-12"><div class="alert alert-danger"><i class="fa fa-times-circle text-danger mr-1"></i>Data toko ini telah dihapus</div></div>`
    }

    $("#dataAjax").html(html);
}