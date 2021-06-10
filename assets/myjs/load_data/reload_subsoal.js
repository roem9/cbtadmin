var page = "";

// Detect pagination click
$("#pagination").on("click", "a", function (e) {
	e.preventDefault();
	var pageno = $(this).attr("data-ci-pagination-page");
	page = pageno;
	$("#skeleton").show();
	loadPagination(pageno);
});

loadPagination(0);

// Load pagination
function loadPagination(pagno) {
	let result = ajax(url_base + "subsoal/loadRecord/" + pagno, "POST", "");

	if (result.total_rows != 0) {
		if (result.total_rows_perpage != 0) {
			$("#pagination").html(result.pagination);
			createTable(result.result, result.row);
		} else {
			page = pagno - 1;
			let result = ajax(url_base + "subsoal/loadRecord/" + page, "POST", "");

			$("#pagination").html(result.pagination);
			createTable(result.result, result.row);
		}
	} else {
		html =`
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

	$("#skeleton").hide();
}

// Create table list
function createTable(data, sno) {
	sno = Number(sno);

	html = "";

	for (index in data) {
		if (data[index].catatan == "") catatan = `tidak ada catatan`;
		else catatan = data[index].catatan;

		html +=`
        <div class="col-md-4">
            <div class="card">
                <div class="card-status-start"></div>
                <ul class="nav nav-tabs" data-bs-toggle="tabs">
                    <li class="nav-item">
                        <a href="#tabs-data-`+index +`" class="nav-link active" data-bs-toggle="tab">
                            <svg width="24" height="24">
                                <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-database" />
                            </svg>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#tabs-soal-`+index+`" class="nav-link" data-bs-toggle="tab">
                            <svg width="24" height="24">
                                <use xlink:href="`+url_base +`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-file" />
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
                                <a class="dropdown-item editSubSoal" href="#editSubSoal" data-bs-toggle="modal" data-id="`+data[index].id_sub+`">Edit</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item hapusSubSoal" href="javascript:void(0)" data-id="`+data[index].id_sub+`">
                                    Hapus
                                </a>
                            </div>
                        </li>
                    </li>
                </ul>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane active show" id="tabs-data-`+index+`">
                            <div>
                                <p>
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-writing" />
                                    </svg> 
                                    `+data[index].tgl_pembuatan+`
                                </p>
                                <p>
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base +`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-id" />
                                    </svg>
                                    `+data[index].nama_sub+`
                                </p>
                                <p>
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base+`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-blockquote" />
                                    </svg> 
                                    `+catatan+`
                                </p>
                            </div>
                        </div>
                        <div class="tab-pane" id="tabs-soal-`+index+`">
                            <div class="mb-3">
                                <a href="`+url_base+`subsoal/edit/`+data[index].link+`" target="_blank" class="btn col-12 btn-sm btn-success">
                                    <svg width="24" height="24" class="me-2">
                                        <use xlink:href="`+url_base +`assets/tabler-icons-1.39.1/tabler-sprite.svg#tabler-edit" />
                                    </svg> 
                                    Soal 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
	}

	$("#dataAjax").html(html);
}
