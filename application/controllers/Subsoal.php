<?php


defined('BASEPATH') OR exit('No direct script access allowed');

class Subsoal extends MY_Controller {

    
    public function __construct() {
        parent::__construct();
        $this->load->model("Main_model");
        $this->load->model("Other_model");
    }
    
    public function index(){
        // navbar and sidebar
        $data['menu'] = "Subsoal";

        // for title and header 
        $data['title'] = "List Sub Soal";

        // for modal 
        $data['modal'] = [
            "modal_subsoal",
            "modal_setting"
        ];
        
        // javascript 
        $data['js'] = [
            "ajax.js",
            "function.js",
            "helper.js",
            "modules/setting.js",
            "modules/subsoal.js",
            "load_data/subsoal_reload.js",
        ];

        // $this->load->view("pages/subsoal/list-soal", $data);
        $this->load->view("pages/subsoal/list", $data);
    }

    public function edit($id){
        $soal = $this->Main_model->get_one("sub_soal", ["md5(id_sub)" => $id, "hapus" => 0]);
        
        // id soal 
        $data['id'] = $id;
        $data['title'] = "List Soal " . $soal['nama_sub'];
        
        $data['menu'] = "Item";

        // for modal 
        $data['modal'] = [
            "modal_item_soal",
            "modal_setting"
        ];
        
        // javascript 
        $data['js'] = [
            "ajax.js",
            "function.js",
            "helper.js",
            "modules/setting.js",
            "modules/item_soal.js",
            // "load_data/reload_soal_listening.js",
            "load_data/reload_item.js",
        ];

        // $this->load->view("pages/subsoal/list-soal", $data);
        $this->load->view("pages/subsoal/list-item", $data);
    }

    public function hasil($id){
        // navbar and sidebar
        $data['menu'] = "Soal";

        // for title and header 
        $data['title'] = "List Hasil Soal";

        $respon = $this->Main_model->get_all("peserta", ["md5(id_sub)" => $id]);
        $data['respon'] = [];
        foreach ($respon as $i => $respon) {
            $data['respon'][$i] = $respon;
            $jawaban = explode("###", $respon['text']);
            $data['respon'][$i]['text'] = $jawaban;
        }

        $this->load->view("pages/subsoal/hasil-soal", $data);
    }

    public function loadSubSoal(){
        header('Content-Type: application/json');
        $output = $this->subsoal->loadSubSoal();
        echo $output;
    }

    // add 
        public function add(){
            $data = $this->Main_model->add_data("sub_soal", $_POST);
            if($data){
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
        }

        public function add_item_soal(){
            $id_sub = $this->input->post("id_sub");
            $soal = $this->Main_model->get_one("sub_soal", ["md5(id_sub)" => $id_sub]);

            $item = $this->Main_model->get_one("item_soal", ["md5(id_sub)" => $id_sub], "urutan", "DESC");
            if($item) {
                $urutan = $item['urutan'] + 1;
            } else {
                $urutan = 1;
            }

            $data = [
                "id_sub" => $soal['id_sub'],
                "item" => $this->input->post("item"),
                "data" => trim($this->input->post("data_soal")),
                "penulisan" => $this->input->post("penulisan"),
                "urutan" => $urutan,
            ];

            $query = $this->Main_model->add_data("item_soal", $data);
            if($query){
                echo json_encode(1);
            } else {
                echo json_encode(0);
            }
        }
    // add 
    
    // get 
        public function get(){
            $id_sub = $this->input->post("id_sub");

            $data = $this->Main_model->get_one("sub_soal", ["id_sub" => $id_sub]);
            echo json_encode($data);
        }

        public function get_all_item(){
            $id_sub = $this->input->post("id_sub");

            $data = $this->Main_model->get_one("sub_soal", ["md5(id_sub)" => $id_sub]);

            $structure = $this->Main_model->get_all("item_soal", ["md5(id_sub)" => $id_sub], "urutan", "ASC");
            $data['item'] = [];

            $j = 1;
            foreach ($structure as $i => $soal) {
                if($soal['item'] == "soal"){

                    // from json to array 
                    // var_dump($soal);
                    $string = trim(preg_replace('/\s+/', ' ', $soal['data']));
                    // $txt_soal = json_decode( preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $soal['data']), true );
                    $txt_soal = json_decode($string, true );
                    
                    
                    // var_dump($txt_soal);

                    if($soal['penulisan'] == "RTL"){
                        $no = $this->Other_model->angka_arab($j).". ";
                        $tes['soal'] = str_replace("{no}", $no, $txt_soal['soal']);
                    } else {
                        $no = $j.". ";
                        $tes['soal'] = str_replace("{no}", $no, $txt_soal['soal']);
                    }

                    $data['item'][$i]['id_item'] = $soal['id_item'];
                    $data['item'][$i]['item'] = $soal['item'];
                    $data['item'][$i]['data']['soal'] = $tes['soal'];
                    $data['item'][$i]['data']['pilihan'] = $txt_soal['pilihan'];
                    $data['item'][$i]['data']['jawaban'] = $txt_soal['jawaban'];
                    $data['item'][$i]['penulisan'] = $soal['penulisan'];
                    
                    $j++;

                } else if($soal['item'] == "petunjuk" || $soal['item'] == "audio"){
                    $data['item'][$i] = $soal;
                    if($soal['item'] == "audio"){
                        $audio = $this->Main_model->get_one("audio", ["id_audio" => $soal['data']]);
                        $data['item'][$i]['file'] = $audio['nama_file'];
                        $data['item'][$i]['nama'] = $audio['nama_audio'];
                    }
                }
            }

            echo json_encode($data);
        }

        public function get_item(){
            $id_item = $this->input->post("id_item");
            $item = $this->Main_model->get_one("item_soal", ["id_item" => $id_item]);
            
            if($item['item'] == "soal"){
                $data = $item;

                // $item = explode("###", $item['data']);
                // from json to array 
                $string = trim(preg_replace('/\s+/', ' ', $item['data']));
                // $txt_soal = json_decode( preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $soal['data']), true );
                $item = json_decode($string, true );
                // $item = json_decode( preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $item['data']), true );

                $data['soal'] = $item['soal'];
                // $data['soal'] = $item[0];
                // $pilihan = explode("///", $item[1]);

                // $data['pilihan_a'] = $pilihan[0];
                // $data['pilihan_b'] = $pilihan[1];
                // $data['pilihan_c'] = $pilihan[2];
                $data['pilihan'] = $item['pilihan'];
                $data['jawaban'] = $item['jawaban'];
            } else if($item['item'] == "petunjuk" || $item['item'] == "audio"){
                $data = $item;
            }

            echo json_encode($data);
        }
    // get 

    // edit 
        public function update(){
            $id_sub = $this->input->post("id_sub");
            
            unset($_POST['id_sub']);

            $data = $this->Main_model->edit_data("sub_soal", ["id_sub" => $id_sub], $_POST);
            if($data){
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
        }

        public function edit_item(){
            $id_item = $this->input->post("id_item");

            $data = [
                "data" => $this->input->post("data_soal"),
                "penulisan" => $this->input->post("penulisan"),
            ];

            $query = $this->Main_model->edit_data("item_soal", ["id_item" => $id_item], $data);
            if($query){
                echo json_encode(1);
            } else {
                echo json_encode(0);
            }
        }

        public function edit_urutan(){
            $id_item = $this->input->post("id_item");

            $i = 1;
            foreach ($id_item as $item) {
                $this->Main_model->edit_data("item_soal", ["id_item" => $item], ["urutan" => $i]);
                $i++;
            }

            echo json_encode(1);
        }
    // edit 

    // delete 
        public function delete(){
            $id_sub = $this->input->post("id_sub");

            $data = $this->Main_model->edit_data("sub_soal", ["id_sub" => $id_sub], ["hapus" => 1]);
            if($data){
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
        }

        public function hapus_item(){
            $id_item = $this->input->post("id_item");

            $item = $this->Main_model->get_one("item_soal", ["id_item" => $id_item]);

            $id_sub = $item['id_sub'];
            $urutan = $item['urutan'];

            $all_item = $this->Main_model->get_all("item_soal", ["id_sub" => $id_sub, "urutan > ", $urutan]);
            foreach ($all_item as $item) {
                $urutan = $item['urutan'] - 1;
                $this->Main_model->edit_data("item_soal", ["id_item" => $item['id_item']], ["urutan" => $urutan]);
            }

            $data = $this->Main_model->delete_data("item_soal", ["id_item" => $id_item]);
            if($data){
                echo json_encode("1");
            } else {
                echo json_encode("0");
            }
        }
    // delete

    // other 
        function hari_ini($hari){
            // $hari = date ("D");
        
            switch($hari){
                case 'Sun':
                    $hari_ini = "Minggu";
                break;
        
                case 'Mon':			
                    $hari_ini = "Senin";
                break;
        
                case 'Tue':
                    $hari_ini = "Selasa";
                break;
        
                case 'Wed':
                    $hari_ini = "Rabu";
                break;
        
                case 'Thu':
                    $hari_ini = "Kamis";
                break;
        
                case 'Fri':
                    $hari_ini = "Jumat";
                break;
        
                case 'Sat':
                    $hari_ini = "Sabtu";
                break;
                
                default:
                    $hari_ini = "Tidak di ketahui";		
                break;
            }
        
            return $hari_ini;
        
        }

        public function tgl_indo($tgl){
            $data = explode("-", $tgl);
            $hari = $data[0];
            $bulan = $data[1];
            $tahun = $data[2];
    
            if($bulan == "01") $bulan = "Januari";
            if($bulan == "02") $bulan = "Februari";
            if($bulan == "03") $bulan = "Maret";
            if($bulan == "04") $bulan = "April";
            if($bulan == "05") $bulan = "Mei";
            if($bulan == "06") $bulan = "Juni";
            if($bulan == "07") $bulan = "Juli";
            if($bulan == "08") $bulan = "Agustus";
            if($bulan == "09") $bulan = "September";
            if($bulan == "10") $bulan = "Oktober";
            if($bulan == "11") $bulan = "November";
            if($bulan == "12") $bulan = "Desember";
    
            return $hari . " " . $bulan . " " . $tahun;
        }
    // other

    public function input($id = 8){
        $data = [
            [
                "tipe" => "petunjuk",
                "data" => '
                    <p><center><b>فهم المقروء</b></center></p>
                    <p>روي أنّ الصحابي الجليل عبد الرحمن بن عوف لمّا هاجر إلى المدينة آخى النبي -صلّى الله عليه وسلّم- بينه وبين صاحبه سعد بن الربيع الذي كان صاحب أموالٍ كثيرةٍ،     فأخبر عبد الرحمن بأنّه سيتنازل له عن نصف ماله وعن زوجةٍ من زوجاته ليتزوّجها، فما كان ردّ عبد الرحمن بن عوف -رضي الله عنه- إلّا أن قال له: "بارك الله لك في مالك وأهلك؛ بل دلّوني على السوق"، ويُذكر أنّه كان صاحب تجارةٍ عظيمةٍ بعد ذلك، وكان يتصدّق على جيوش المسلمين وفقرائهم بمئات الآلاف من الدنانير</p>
                '
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 1,
                    "soal" => 'المراد بكلمة "الجليل" ... ',
                    "pilihan" => [
                        "الواسع",
                        "الجبار",
                        "الكريم",
                        "الصديق",
                    ],
                    "jawaban" => "الكريم",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 2,
                    "soal" => 'هل سعد بن الربيع من رجل ثري؟ ',
                    "pilihan" => [
                        "نعم، هو رجل ثري",
                        "ليس هو رجل ثري",
                        "لا، هو ليس رجل ثري",
                        "بلى، هو رجل ثري",
                    ],
                    "jawaban" => "نعم، هو رجل ثري",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 3,
                    "soal" => 'ما المراد بهذا القول "دلّوني على السوق"؟',
                    "pilihan" => [
                        "أن عبد الرحمن بن عوف سيذهب إلى السوق",
                        "أن سعد بن الربيع تاجر في السوق",
                        "أن سعد بن الربيع هو رئيس السوق",
                        "أن عبد الرحمن يريد التجارة في السوق",
                    ],
                    "jawaban" => "أن عبد الرحمن يريد التجارة في السوق",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 4,
                    "soal" => 'المرادف من كلمة "الجيوش"... ',
                    "pilihan" => [
                        "الجنود",
                        "البوليس",
                        "الحافظ",
                        "الأمن",
                    ],
                    "jawaban" => "الجنود",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 5,
                    "soal" => 'أين سكن عبد الرحمن بن عوف قبل الهجرة؟ ',
                    "pilihan" => [
                        "الكوفة",
                        "البصرة",
                        "مكة",
                        "البغداد",
                    ],
                    "jawaban" => "مكة",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 6,
                    "soal" => 'المفرد من كلمة "الدنانير"',
                    "pilihan" => [
                        "الدنر",
                        "الدينر",
                        "الدينار",
                        "الدوار",
                    ],
                    "jawaban" => "الدينار",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 7,
                    "soal" => 'المراد من "بأنه سيتنازل له"....',
                    "pilihan" => [
                        "بأنه سيخبره",
                        "بأنه سيمنحه",
                        "بأنه سيتركه",
                        "بأنه سيمنعه",
                    ],
                    "jawaban" => "بأنه سيمنحه",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 8,
                    "soal" => 'من أصبح بصاحب تجارةٍ عظيمةٍ؟',
                    "pilihan" => [
                        "عبد الرحمن بن عوف",
                        "النبي صلى الله عليه وسلم",
                        "سعد بن الربيع",
                        "علي بن أبي طالب",
                    ],
                    "jawaban" => "عبد الرحمن بن عوف",
                ]
            ],
            [
                "tipe" => "petunjuk",
                "data" => '
                    <p>في غابة جميلة غنّاء سمعت الحيوانات صوت شجار غرابين واقفين على غصن شجرة عالِ، فقَدِم الثعلب. وحاول أن يفهم سبب شجارهما، وما إن اقترب أكثر حتى سأل الغرابين: ما بالكما أيها الغرابين؟ فقال أحدهما: اتفقنا على أن نتشارك قطعة الجبن هذه بعد أن نقسمها بالتساوي، لكنّ هذا الغراب الأحمق يحاول أن يأخذ أكثر من نصيبه، فابتسم الثعلب وقال: إذن ما رأيكما أن أساعدكما في حل هذه المشكلة، وأقسم قطعة الجبن </p>
                    <p>بينكما بالتساوي؟ نظر الغرابان إلى بعضهما ووافقا على اقتراح الثعلب، وأعطياه قطعة الجبن، فقسم الثعلب قطعة الجبن وقال: يا إلهي لقد أخطأت في قسمتها، فهذه القطعة تبدو أكبر من تلك، سآكل من القطعة الكبيرة قليلاً حتى تتساوى القطعتان في الحجم، فالعدل هو الأساس، وأكل من القطعة الكبيرة قضمة حتى أصبحت أصغر من الأولى، فاعتذر للغرابين على خطئه وقرّر أن يأكل من القطعة الأولى حتى تصبحان متساويتين فهذا هو الحل الوحيد، وظلّ الثعلب على هذه الحال يقسم القطعة بشكل غير متساوِ متعمداً، ثمّ يأكل من قطعة فتصبح أصغر من الأخرى حتى أكل قطعة الجبن كاملة كما خطّط وفرّ من الغرابين هارباً، بينما تعلّم الغرابان أن يحلّا مشاكلهما بنفسيهما دون الاستعانة بالثعلب الشرير.</p>
                '
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 9,
                    "soal" => 'المرادف من كلمة "العالي"....',
                    "pilihan" => [
                        "المجتبى",
                        "المنادى",
                        "المرتفع",
                        "السامي",
                    ],
                    "jawaban" => "المرتفع",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 10,
                    "soal" => 'الجمع من كلمة "الغصن" في فقوة الأولى... ',
                    "pilihan" => [
                        "الغصان",
                        "الأغصن",
                        "الغصون",
                        "الأغصان",
                    ],
                    "jawaban" => "الأغصان",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 11,
                    "soal" => 'من قام بتقسيم قطعة الجبن؟',
                    "pilihan" => [
                        "الغرابين",
                        "النملة",
                        "الثعلب",
                        "الفيل",
                    ],
                    "jawaban" => "الثعلب",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 12,
                    "soal" => 'لماذا شاجر الغرابان؟',
                    "pilihan" => [
                        "لأنهما سيأكلان قطعة من الجبن",
                        "لأنهما سيقسمان قطعة من الجبن",
                        "لأنهما وجدا قطعة من الجبن",
                        "لأنهما يريدان قطعة من الجبن",
                    ],
                    "jawaban" => "لأنهما سيقسمان قطعة من الجبن",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 13,
                    "soal" => 'المرادف من كلمة "قسم" في الفقرة السابقة هي...',
                    "pilihan" => [
                        "وزّع",
                        "بذر",
                        "أسلف",
                        "بادر",
                    ],
                    "jawaban" => "وزّع",
                ]
            ],
            
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 14,
                    "soal" => 'المرادف من كلمة "شاجر"... ',
                    "pilihan" => [
                        "ساوم",
                        "شارك",
                        "أصلح",
                        "خاصم",
                    ],
                    "jawaban" => "خاصم",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 15,
                    "soal" => 'مذا شعر الغرابان في النهاية؟',
                    "pilihan" => [
                        "الفرحة",
                        "الحزينة",
                        "الندامة",
                        "السعادة",
                    ],
                    "jawaban" => "الندامة",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 16,
                    "soal" => 'اشتهر الثعلب بأنه حيوان....',
                    "pilihan" => [
                        "الصدق",
                        "المكّار",
                        "الأمانة",
                        "الذاكي",
                    ],
                    "jawaban" => "المكّار",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 17,
                    "soal" => 'هل أكل الغربان قطعة الجبن؟',
                    "pilihan" => [
                        "نعم، أكل الغربان قطعة الجبن",
                        "نعم، ليس أكل الغربان قطعة الجبن",
                        "لا، ما أكل الغربان قطعة الجبن",
                        "لا، ليس أكل الغربان قسمة الجبن",
                    ],
                    "jawaban" => "لا، ما أكل الغربان قطعة الجبن",
                ]
            ],
            [
                "tipe" => "petunjuk",
                "data" => "
                    <p> انتقلت الصين من النظام الاقتصادي المغلق والمركزي إلى النظام المفتوح المتجه نحو السوق العالمي، وكان ذلك منذ أواخر السبعينيات، حيث إنّ الحكومة الصينية قامت بعدة إصلاحات تدريجية أدت إلى زيادة الناتج المحلي الإجمالي بأكثر من عشرة أضعاف ما كان عليه منذ عام 1978م، وقد اشتملت هذا الإصلاحات على الزراعة وتحرير الأسعار، وزادت استقلال الشركات الحكومية، كما أنّها ساعدت على نمو القطاع الخاص، وزادت إلى تنمية الأنظمة المصرفية، وزادت في الانفتاح على التجارة والاستثمار الخارجي، كما دعمت الدولة القطاعات الرئيسية بشكل كبير، وفي عام 2013م أصبحت الصين من أكبر الدول التجارية العالمية، وفي عام 2014م تفوقت الصين على الولايات المتحدة الأمريكية من ناحية الاقتصاد، والجدير بالذكر أنّه وبحلول عام 2016م اصبحت الصين من الدول ذات الاقتصاد الكبير في العالم، وبالرغم من ذلك يعدّ دخل الفرد الصيني اقل من المتوسط العالمي</p>
                "
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 18,
                    "soal" => 'ما عاصمة بلاد الصين؟',
                    "pilihan" => [
                        "شنغاهي",
                        "بكين",
                        "تيونكوك",
                        "فيكنج",
                    ],
                    "jawaban" => "بكين",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 19,
                    "soal" => 'لماذا انتقلت الصين من النظام الاقتصادي المغلق والمركزي إلى النظام المفتوح المتجه نحو السوق العالمي؟',
                    "pilihan" => [
                        "لزيادة النتاج العالمي",
                        "لزيادة النتاج المحلي",
                        "لزيادة النتاج السنوي",
                        "لزيادة النتاج البشري",
                    ],
                    "jawaban" => "لزيادة النتاج المحلي",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 20,
                    "soal" => 'متى قام بلاد الصين بتغيير النظام الإقتصادي؟',
                    "pilihan" => [
                        "١٩٧٨",
                        "٢٠١٣",
                        "٢٠١٤",
                        "٢٠١٦",
                    ],
                    "jawaban" => "١٩٧٨",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 21,
                    "soal" => 'حيث إنّ الحكومة الصينية قامت بعدة إصلاحات تدريجية أدت إلى زيادة الناتج المحلي الإجمالي. المراد بكلمة "تدريجية" في الجملة السابقة هي؟',
                    "pilihan" => [
                        "مهلا بمهل",
                        "شيئا فشيئا",
                        "نمو سريعا",
                        "أسرع وقت",
                    ],
                    "jawaban" => "شيئا فشيئا",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 22,
                    "soal" => 'من ساعد على نمو القطاع الخاص في بلاد الصين؟',
                    "pilihan" => [
                        "النظام الإقتصادي",
                        "النظام المحلي",
                        "الرئيس الجمهرية",
                        "الفلاحون",
                    ],
                    "jawaban" => "النظام الإقتصادي",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 23,
                    "soal" => 'أين تقع بلاد الصين؟',
                    "pilihan" => [
                        "قارة آسيا",
                        "قارة أستراليا",
                        "قارة افريقية",
                        "قارة أمركية",
                    ],
                    "jawaban" => "قارة آسيا",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 24,
                    "soal" => 'متى اصبحت الصين من الدول ذات الاقتصاد الكبير في العالم؟',
                    "pilihan" => [
                        "١٩٧٨",
                        "٢٠١٣",
                        "٢٠١٤",
                        "٢٠١٦",
                    ],
                    "jawaban" => "٢٠١٦",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 25,
                    "soal" => 'من المزايا تغيير النظام الإقتصادي هي.... ',
                    "pilihan" => [
                        "زادت استقلال الشركات الحكومية",
                        "ساعدت على نمو القطاع العام",
                        "زادت إلى نقصان الأنظمة المصرفية",
                        "وزادت في الإغلاق على التجارة والاستثمار الخارجي",
                    ],
                    "jawaban" => "زادت استقلال الشركات الحكومية",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 26,
                    "soal" => 'متى تفوقت الصين على الولايات المتحدة الأمريكية من ناحية الاقتصاد؟ ',
                    "pilihan" => [
                        "١٩٧٨",
                        "٢٠١٣",
                        "٢٠١٤",
                        "٢٠١٦",
                    ],
                    "jawaban" => "٢٠١٤",
                ]
            ],
            [
                "tipe" => "petunjuk",
                "data" => '
                    <p>من قصص الصَّحابة التي وردت قصة أبي الدحداح والنَّخلة، فقد جاء رجلُ يشتكي لرسول الله -صلى الله عليه وسلم- أنَّه كان يبني سورًا حول بستانه، وفي مكان بناء السُّور كان هناك نخلةُ لجاره سببت اعوجاج السُّور، فطلب من صاحب هذه النَّخلة أن يعطيه إياها مقابل مال حتَّى يستقيم بناؤه فرفض، وحينما استدعى رسول الله هذا الرُّجل وسؤاله إياه عن النَّخلة أقرَّ بالأمر.</p>
                    <p>فطلب منه الرَّسول أن يعطيه النَّخلة مقابل نخلةٍ في الجنَّة فرفض الرَّجل، فتمنَّى أبو الدَّحداح أن تكون تلك النَّخلة التي في الجنة من نصيبه، فاشترى تلك النَّخلة بكامل بستانه ونخيله، فهنَّأه رسول الله وبشَّره بأشجار النَّخيل التي له في الجنة، وقد ورد هذا في حديث أنس بن مالك حينما قال:"قال رسولُ اللهِ صلَّى اللهُ عليه وسلَّم: كم مِن عذقٍ رداحٍ لأبي الدحداحِ في الجنةِ قالها مرارًا فأتى امرأتَه فقال: يا أمَّ الدحداحِ اخرُجي منَ الحائطِ فإني قد بِعتُه بنخلةٍ في الجنةِ فقالت: ربِح البيعُ أو كلمةً تُشبِهُها".</p>
                '
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 27,
                    "soal" => 'لماذا جاء الرجل إلى النبي؟',
                    "pilihan" => [
                        "للصلاة معه",
                        "ليخبر مشاكله",
                        "ليسمع نصيحته",
                        "ليتقرب منه",
                    ],
                    "jawaban" => "ليتقرب منه",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 28,
                    "soal" => 'هل قابل صاحب النخلة على رأي الرجل؟',
                    "pilihan" => [
                        "نعم، قابل صاحب النخلة على رأي الرجل",
                        "نعم، ليس قابل صاحب النخلة على رأي الرجل",
                        "لا، ما قابل صاحب النخلة على بستان الرجل",
                        "لا، رفض صاحب النخلة على رأي الرجل",
                    ],
                    "jawaban" => "لا، رفض صاحب النخلة على رأي الرجل",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 29,
                    "soal" => 'لماذا اشترى أبو الدحداح تلك النَّخلة بكامل بستانه ونخيله؟',
                    "pilihan" => [
                        "لأنه كثرة الفلوس لشراء النخلة",
                        "لأنه يحب شجرة النخلة",
                        "لأنه يريد أن يملك النخلة في الجنة",
                        "لأنه يتأسف على بائع النخلة",
                    ],
                    "jawaban" => "لأنه يريد أن يملك النخلة في الجنة",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 30,
                    "soal" => 'من قال هذا القول "ربِح البيعُ"؟',
                    "pilihan" => [
                        "رسول الله صلى الله عليه وسلم",
                        "أبوالدحداح",
                        "أم الدحداح",
                        "أنس بن مالك",
                    ],
                    "jawaban" => "أم الدحداح",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 31,
                    "soal" => 'المضاد من كلمة "رفض".... ',
                    "pilihan" => [
                        "قابل",
                        "أنجب",
                        "بيّن",
                        "استسلم",
                    ],
                    "jawaban" => "قابل",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 32,
                    "soal" => 'المرادف من كلمة "تمنى"....',
                    "pilihan" => [
                        "رجى",
                        "أنقذ",
                        "سار",
                        "أوصل",
                    ],
                    "jawaban" => "رجى",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 33,
                    "soal" => 'لماذا طلب الرَّسول من الرجل أن يعطيه النَّخلة مقابل نخلةٍ في الجنَّة؟',
                    "pilihan" => [
                        "لأن جاره هدم السورا",
                        "ليكون عوضا لجاره",
                        "ليكون تسليما على السور",
                        "ليكون الأمن فيهم",
                    ],
                    "jawaban" => "ليكون عوضا لجاره",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 34,
                    "soal" => 'المرادف من كلمة "اعوجاج"؟',
                    "pilihan" => [
                        "القوام",
                        "انعطاف",
                        "انكسار",
                        "إبطال",
                    ],
                    "jawaban" => "انعطاف",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 35,
                    "soal" => 'من هو أبو الدحداح؟',
                    "pilihan" => [
                        "التابعين",
                        "الصحابة",
                        "عم النبي",
                        "تابع التابعين",
                    ],
                    "jawaban" => "الصحابة",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 36,
                    "soal" => 'لماذا اشتكى الناس رسول الله صلى الله عليه وسلم؟',
                    "pilihan" => [
                        "ليحل مشاكلهم",
                        "ليتأسف مشاكلهم",
                        "لينظر مشاكلهم",
                        "لينال الأجرة منهم",
                    ],
                    "jawaban" => "ليحل مشاكلهم",
                ]
            ],
            [
                "tipe" => "petunjuk",
                "data" => '
                    <p>غلب الجانب العلمي والفكري في سيرة الشيخ رشيد رضا على كفاحه السياسي، فرغم كونه ظهر في وقت عصيب، هو وقت تمكن الاحتلال من الديار المصرية، حيث تمكن الاحتلال الإنجليزي من مصر ولم يزل رشيد رضا في السابعة عشرة من عمره، فكانت جريدة "العروة الوثقى" التي يصدرها الأفغاني وعبده من أوائل من حرك همه إلى السياسة وشؤون المسلمين، ثم التقى بمحمد عبده وصار رفيقه، ورغم انصراف محمد عبده إلى شأن التربية والتعليم والإصلاح بعد رجوعه إلى مصر دون اشتباك بشأن السياسة إلا أن مجلة المنار -التي صدرت قبل سبع سنوات من وفاة محمد عبده، واستمرت سبعة وثلاثين عاما حتى وفاة رشيد رضا- هي وثيقة تاريخية حافلة بالهم السياسي الواسع لرشيد رضا، والمتابعة الوافرة لشؤون المسلمين عبر العالم.</p>
                    <p>إلا أن شأنه لم يكن فقط الكتابة، فلقد شارك في المؤتمرين الإسلاميين المنعقدين في مكة (1926م) والقدس (1931م)، ولعب دورا في كفاح سوريا السياسي، فقد كان في حزب اللامركزية قبل 1914، وفي المفاوضات التي جرت أثناء الحرب مع البريطانيين، ورأس المؤتمر السوري (1920م)، وكان عضوا بالوفد السوري الفلسطيني إلى جنيف (1921م)، وفي اللجنة السياسية في القاهرة عند وقوع الثورة السورية عامي 1925و 1926م. ولهذا النشاط السياسي وضعنا رشيد رضا ضمن زعماء التغيير في دراستنا هذه، مع أن الشيخ الغزالي لم يتناول إلا الجانب المشتهر منه، وهو الجانب العلمي الفكري، وهو كثيرا ما يتناوله ضمن موقعه من مدرسة الأفغاني ومحمد عبده.</p>
                    <p>ولقد بلغ تقدير الغزالي لرشيد رضا أن يسبغ عليه وعلى مدرسته هذا الوصف الكبير، يقول: "كان محمد رشيد رضا ترجمان القرآن وشارة السلفية الصحيحة والمفتي العارف بأهداف الإسلام والمستوعب لآثاره"، وإن "مدرسة المنار هي المهاد الأوحد للصحوة الإسلامية الحاضرة، وعلى الذين يرفعون القواعد من هذا المهاد أن يتجنبوا بعض الهنات التي فات فيها الصواب إمامنا الكبير، فما نزعم عصمة له أو لغيره"</p>
                '
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 37,
                    "soal" => 'ما هو "العروة الوثقى"؟',
                    "pilihan" => [
                        "الصحف",
                        "الكتاب",
                        "المكان",
                        "المسجد",
                    ],
                    "jawaban" => "الصحف",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 38,
                    "soal" => 'من شارك في عديد من المؤتمرين الإسلاميين؟',
                    "pilihan" => [
                        "محمد عبده",
                        "الأفغاني",
                        "رشيد رضا",
                        "محمد جنيد",
                    ],
                    "jawaban" => "رشيد رضا",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 39,
                    "soal" => 'من قام بتصدير "العروة الوثقى"؟',
                    "pilihan" => [
                        "محمد عبده",
                        "الأفغاني",
                        "رشيد رضا",
                        "محمد جنيد",
                    ],
                    "jawaban" => "رشيد رضا",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 40,
                    "soal" => 'لماذا دخل رشيد رضا في السياسة وشؤون المسلمين؟',
                    "pilihan" => [
                        "لأنه سيساعد المسلمين",
                        "لأنه لم يتمكن على التربية",
                        "لأنه سيصلح السياسة في بلاده",
                        "لأن يعرف السياسة ",
                    ],
                    "jawaban" => "لأنه سيصلح السياسة في بلاده",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 41,
                    "soal" => 'متى قام رشيد رضا برأس المؤتمر السوري؟',
                    "pilihan" => [
                        "١٩١٦",
                        "١٩٢١",
                        "١٩٢٠",
                        "١٩٢٥",
                    ],
                    "jawaban" => "١٩٢٠",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 42,
                    "soal" => 'أين تقع مدرسة المنار؟',
                    "pilihan" => [
                        "الجزيرة",
                        "مصر",
                        "بريطانيا",
                        "الهولند",
                    ],
                    "jawaban" => "مصر",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 43,
                    "soal" => 'هل الغزالي يتفق برشيد رضا؟',
                    "pilihan" => [
                        "لا، ليس يتفق معه",
                        "نعم، لا يتفق معه",
                        "لا، ما اتفق به",
                        "نعم، يتفق معه",
                    ],
                    "jawaban" => "نعم، يتفق معه",
                ]
            ],
            [
                "tipe" => "petunjuk",
                "data" => '
                    <p>من الأخلاق الكثيرة التي تميّز بها نبيّ الله محمّد عليه الصّلاة والسّلام خلق التّسامح بكلّ ما يتضمّنه من معاني العفو، والصّفح، والغفران، فلم يَعرف النّبي الكريم الحقد، ولم تتسلّل إلى قلبه رغبات الانتقام ممّن يسيء إليه، ولم يفكّر يوماً في مقابلة الإساءة بالإساءة، على الرّغم من الأذى الشّديد، والصدّ الكبير الذي تعرّض له من قبل قومه في بداية دعوته؛ بل كان مثالاً في العفو عمّن ظلمه وأساء إليه ابتغاء رضوان الله تعالى وجنّته، متمثلاً قوله تعالى: (ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيم ) [فصلت:34]، وراجياً من وراء عفوه وتسامحه أن يخرج الله من أصلاب من أساء إليه من يعبد الله ولا يُشرك به شيئاً.</p>
                    <p>قصّة النّبي مع الرّجل الذي أراد قتله؛ فقد روى جابر بن عبد الله قصّةً تدلّ على تسامح النّبي عليه الصّلاة والسّلام، ففي غزوة الرّقاع استراح النبي الكريم تحت شجرةٍ بعد أن علّق سيفه عليها، فاستغلّ رجلٌ من المشركين ذلك فباغت النّبي وأخذ سيفه على حين غرّة، ثمّ رفعه في وجه النّبي وهو يقول، أتخافني، فقال النّبي: لا، فقال الرّجل: "فمن يمنعك مني"، قال: الله، فسقط السّيف من يد الرّجل فأخذه النّبي الكريم ورفعه في وجه الرّجل وهو يقول من يمنعني منك، فقال الرّجل، كن خير آخذ، فلم يَفعل النّبي الكريم معه شيئاً وعفى عنه بعد أن تعهّد بأن لا يُقاتل المسلمين أو يقف مع قوم يقاتلونهم، فجاء قومه وهو يقول: (جئتكم من عند خير النّاس).</p>
                '
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 44,
                    "soal" => 'المرادف من كلمة "الحقد"؟',
                    "pilihan" => [
                        "الحسود",
                        "الجريمة",
                        "الشر",
                        "الاستقامة",
                    ],
                    "jawaban" => "الحسود",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 45,
                    "soal" => 'المفرد من كلمة "رضوان" ؟',
                    "pilihan" => [
                        "راض",
                        "ريضى",
                        "رضى",
                        "رضا",
                    ],
                    "jawaban" => "رضا",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 46,
                    "soal" => 'من هو "جابر بن عبد الله"؟',
                    "pilihan" => [
                        "التابعين",
                        "تابع التابعين",
                        "الصحابة",
                        "آل النبي",
                    ],
                    "jawaban" => "الصحابة",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 47,
                    "soal" => 'لماذا أراد الرجل أن يقتل النبي؟',
                    "pilihan" => [
                        "لأنه مرض",
                        "لأنه أخذ سيفه",
                        "لأنه يكرهه",
                        "لأنه خاف منه",
                    ],
                    "jawaban" => "لأنه يكرهه",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 48,
                    "soal" => 'لماذا لا يخاف النبي من الرجل؟',
                    "pilihan" => [
                        "لأن النبي يخاف الله",
                        "لأن النبي ينظر الله",
                        "لأن النبي يفهم الله",
                        "لأن النبي خليل الله",
                    ],
                    "jawaban" => "لأن النبي يخاف الله",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 49,
                    "soal" => 'في أي غزوة حدثت هذه الواقعة؟',
                    "pilihan" => [
                        "غزوة البدر",
                        "غزوة الأحد",
                        "غزوة الرقاع",
                        "غزة الحنين",
                    ],
                    "jawaban" => "غزوة الرقاع",
                ]
            ],
            [
                "tipe" => "soal",
                "data" => [
                    "no" => 50,
                    "soal" => 'هل قتل النبي الرجل الذي أراد قتله؟',
                    "pilihan" => [
                        "نعم، قتله النبي",
                        "نعم، لم يقتله النبي",
                        "لا، يقبل النبي قتله",
                        "لا، ما قتله النبي",
                    ],
                    "jawaban" => "لا، ما قتله النبي",
                ]
            ],
            
        ];

        foreach ($data as $i => $data) {
            $datas['id_sub'] = $id;
            $datas['item'] = $data['tipe'];

            if($data['tipe'] == 'soal'){
                $pilihan = "";
                foreach ($data['data']['pilihan'] as $pil) {
                    $pilihan .= "\"".$pil."\",";
                }
                $pilihan = substr($pilihan, 0, -1);
                $data_soal = "{\"soal\":\"<p>{no}".str_replace('"', '\"', $data['data']['soal'])."</p>\",\"pilihan\":[".$pilihan."],\"jawaban\":\"".$data['data']['jawaban']."\"}";
            } elseif($data['tipe'] == "audio") {
                $audio = $this->Main_model->get_one("audio", ["nama_audio" => str_replace(".mp3", "", $data['data'])]);
                $data_soal = $audio['id_audio'];
            } elseif ($data['tipe'] == "petunjuk") {
                $data_soal = $data['data'];
            }

            $datas['data'] = $data_soal;
            $datas['penulisan'] = "RTL";
            $datas['urutan'] = $i + 1;

            $this->subsoal->add_data("item_soal", $datas);
        }

        echo "Selesai";
    }
}

/* End of file Soal.php */
