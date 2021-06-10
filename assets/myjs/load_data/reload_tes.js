var page = "";
        
// Detect pagination click
$('#pagination').on('click','a',function(e){
    e.preventDefault(); 
    var pageno = $(this).attr('data-ci-pagination-page');
    page = pageno;
    $("#skeleton").show()
    loadPagination(pageno);

});

loadPagination(0);

// Load pagination
function loadPagination(pagno){
    let result = ajax(url_base+"tes/loadRecord/"+pagno, "POST", "");
    
    if(result.total_rows != 0) {
        
        if(result.total_rows_perpage != 0){
            
            $('#pagination').html(result.pagination);
            createTable(result.result,result.row);

        } else {
            page = pagno - 1;
            let result = ajax(url_base+"tes/loadRecord/"+page, "POST", "");

            $('#pagination').html(result.pagination);
            createTable(result.result,result.row);
        }

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

        $("#dataAjax").html(html);
    }
    
    $("#skeleton").hide()
}

// Create table list
function createTable(data,sno){

    sno = Number(sno);

    html = "";

    for(index in data){
        if(data[index].status == "Selesai"){
            color = `success`;
        } else {
            color = `warning`;
        }

        html += `
        <div class="col-md-4">
            <div class="card">
                <div class="card-status-start bg-`+color+`"></div>
                <ul class="nav nav-tabs `+color+`" data-bs-toggle="tabs">
                <li class="nav-item">
                    <a href="#tabs-data-`+index+`" class="nav-link active" data-bs-toggle="tab">
                        <svg width="24" height="24">
                            <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-database" />
                        </svg>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#tabs-notes-`+index+`" class="nav-link" data-bs-toggle="tab">
                        <svg width="24" height="24">
                            <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-notes" />
                        </svg>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#tabs-link-`+index+`" class="nav-link" data-bs-toggle="tab">
                        <svg width="24" height="24">
                            <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-link" />
                        </svg>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#tabs-peserta-`+index+`" class="nav-link" data-bs-toggle="tab">
                        <svg width="24" height="24">
                            <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-users" />
                        </svg>
                    </a>
                </li>
                <li class="nav-item ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <svg width="24" height="24">
                                <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-settings" />
                            </svg>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item editTes" href="#editTes" data-bs-toggle="modal" data-id="`+data[index].id_tes+`">Edit</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item hapusTes" href="javascript:void(0)" data-id="`+data[index].id_tes+`">Hapus</a>
                        </div>
                    </li>
                </li>
                </ul>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane active show" id="tabs-data-`+index+`">
                            <div>
                                <h5><b><center>`+data[index].nama_tes+`</center></b></h5>
                                <p>
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-info-circle" />
                                    </svg> 
                                    `+data[index].status+`
                                </p>
                                <p>
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-calendar-event" />
                                    </svg> 
                                    `+data[index].tgl_tes+`
                                </p>
                                <p>
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-bell-ringing" />
                                    </svg> 
                                    `+data[index].tgl_pengumuman+`
                                </p>
                                <p>
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-file-text" />
                                    </svg>
                                    `+data[index].nama_soal+`
                                </p>
                                <p>
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-alarm" />
                                    </svg> 
                                    `+data[index].waktu+` menit
                                </p>
                            </div>
                        </div>
                        <div class="tab-pane" id="tabs-notes-`+index+`">
                            <div>
                                `+data[index].catatan+`
                            </div>
                        </div>
                        <div class="tab-pane" id="tabs-link-`+index+`">
                            <div>
                                <p>
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-key" />
                                    </svg>
                                    `+data[index].password+`
                                </p>
                                <p>
                                    <b>Link : </b><br>
                                    `+data[index].link+`
                                </p>
                            </div>
                        </div>
                        <div class="tab-pane" id="tabs-peserta-`+index+`">
                            <p>
                                <svg width="24" height="24" class="me-2">
                                    <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-users" />
                                </svg>
                                `+data[index].peserta+` Peserta
                            </p>
                            <p class="text-right">
                                <a href="`+url_base+`/tes/hasil/`+data[index].id_hasil+`" target="_blank" class="btn btn-sm btn-success">
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-report" />
                                    </svg>
                                    Hasil
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    $("#dataAjax").html(html);

};