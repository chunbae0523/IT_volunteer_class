const LANG_STORE_KEY = "day-todo-v2";

const I18N = {
  ko: {
    pageTitle: "Atlas — 여행 루트 추천",
    langBtn: "Tiếng Việt",
    navHome: "홈",
    navTodo: "일정",
    navBudget: "가계부",
    navWeather: "날씨",
    navFlash: "플래시",
    navTravel: "여행",
    navAbout: "소개",
    eyebrow: "Travel Guide",
    tagline: "여행지를 검색하면 하루 루트와 명소를 바로 추천해요.",
    searchLabel: "여행지 검색",
    searchPlaceholder: "예: 제주, 다낭, 도쿄…",
    searchBtn: "검색",
    hint: "인기 여행지를 눌러도 바로 볼 수 있어요.",
    tabRoutes: "추천 루트",
    tabSpots: "명소",
    emptyQuery: "여행지 이름을 입력해 주세요.",
    notFound: "아직 이 여행지 데이터가 없어요. 아래 인기 여행지를 눌러보세요.",
    found: (name) => `${name} 루트와 명소를 준비했어요.`,
    season: "추천 시기",
    days: "권장 일수",
    vibe: "분위기",
    dayLabel: (n) => `${n}일차`,
  },
  vi: {
    pageTitle: "Atlas — Gợi ý lộ trình du lịch",
    langBtn: "한국어",
    navHome: "Trang chủ",
    navTodo: "Lịch trình",
    navBudget: "Thu chi",
    navWeather: "Thời tiết",
    navFlash: "Flash",
    navTravel: "Du lịch",
    navAbout: "Giới thiệu",
    eyebrow: "Cẩm nang du lịch",
    tagline: "Tìm điểm đến để nhận lộ trình theo ngày và địa điểm nổi bật.",
    searchLabel: "Tìm điểm đến",
    searchPlaceholder: "VD: Jeju, Đà Nẵng, Tokyo…",
    searchBtn: "Tìm",
    hint: "Hoặc chọn điểm đến phổ biến bên dưới.",
    tabRoutes: "Lộ trình",
    tabSpots: "Địa điểm",
    emptyQuery: "Hãy nhập tên điểm đến.",
    notFound: "Chưa có dữ liệu cho điểm này. Hãy chọn điểm phổ biến bên dưới.",
    found: (name) => `Đã sẵn sàng lộ trình và địa điểm cho ${name}.`,
    season: "Mùa đẹp",
    days: "Số ngày",
    vibe: "Không khí",
    dayLabel: (n) => `Ngày ${n}`,
  },
};

const DESTINATIONS = [
  {
    id: "jeju",
    aliases: ["제주", "제주도", "jeju", "jeju island"],
    tones: ["#3aa6c9", "#0f4c5c"],
    mark: "JEJU",
    ko: {
      name: "제주",
      country: "대한민국",
      blurb: "화산섬의 바다·오름·카페를 하루 루트로 묶었어요. 렌터카가 있으면 동선이 훨씬 편해요.",
      season: "4–6월, 9–10월",
      days: "2–3일",
      vibe: "자연 · 드라이브",
      routes: [
        {
          theme: "서쪽 바다와 카페",
          stops: [
            { title: "애월 해안도로", tip: "오전 드라이브로 시작. 주차는 카페 옆 공용지를 이용하세요." },
            { title: "한림공원 / 금능해변", tip: "산책 후 금능에서 물놀이. 모래가 고와서 여유롭게." },
            { title: "협재·곽지", tip: "석양 직전 협재가 특히 예뻐요. 저녁은 애월 해산물로." },
          ],
        },
        {
          theme: "동부 자연과 오름",
          stops: [
            { title: "성산일출봉", tip: "이른 오전이 한산해요. 등반 30–40분 잡으세요." },
            { title: "우도 / 섭지코지", tip: "우도 당일치기 또는 섭지코지 산책 중 선택." },
            { title: "월정리 해변", tip: "카페 거리와 바다를 보며 하루를 마무리." },
          ],
        },
      ],
      spots: [
        { name: "성산일출봉", area: "성산", desc: "유네스코 세계자연유산. 정상 전망이 압도적이에요." },
        { name: "협재해수욕장", area: "한림", desc: "에메랄드 바다와 비양도 뷰. 가족·커플 모두 인기." },
        { name: "한라산 영실코스", area: "중산간", desc: "비교적 부담 없는 트레킹. 날씨·예약 확인 필수." },
        { name: "동문시장", area: "제주시", desc: "흑돼지·귤·해산물 간식. 저녁 분위기가 좋아요." },
      ],
    },
    vi: {
      name: "Jeju",
      country: "Hàn Quốc",
      blurb: "Đảo núi lửa với biển, oreum và quán cafe. Thuê xe sẽ giúp lộ trình mượt hơn nhiều.",
      season: "Th4–6, Th9–10",
      days: "2–3 ngày",
      vibe: "Thiên nhiên · Lái xe",
      routes: [
        {
          theme: "Biển phía tây & cafe",
          stops: [
            { title: "Đường biển Aewol", tip: "Bắt đầu buổi sáng. Đỗ xe gần các quán cafe." },
            { title: "Hallim / bãi Geumneung", tip: "Dạo bộ rồi tắm biển; cát mịn, rất thư giãn." },
            { title: "Hyeopjae · Gwakji", tip: "Hoàng hôn ở Hyeopjae đẹp nhất. Ăn hải sản Aewol." },
          ],
        },
        {
          theme: "Thiên nhiên phía đông",
          stops: [
            { title: "Seongsan Ilchulbong", tip: "Sáng sớm ít người. Leo khoảng 30–40 phút." },
            { title: "Udo / Seopjikoji", tip: "Chọn đi Udo trong ngày hoặc dạo Seopjikoji." },
            { title: "Bãi Woljeongri", tip: "Kết ngày với cafe và view biển." },
          ],
        },
      ],
      spots: [
        { name: "Seongsan Ilchulbong", area: "Seongsan", desc: "Di sản thiên nhiên UNESCO, view đỉnh cực ấn tượng." },
        { name: "Bãi Hyeopjae", area: "Hallim", desc: "Biển xanh ngọc và đảo Biyangdo." },
        { name: "Hallasan (Yeongsil)", area: "Trung đảo", desc: "Trekking vừa sức; kiểm tra thời tiết & đặt chỗ." },
        { name: "Chợ Dongmun", area: "Jeju-si", desc: "Heo đen, quýt, hải sản — không khí buổi tối vui." },
      ],
    },
  },
  {
    id: "seoul",
    aliases: ["서울", "seoul"],
    tones: ["#e07a5f", "#1f3a5f"],
    mark: "SEOUL",
    ko: {
      name: "서울",
      country: "대한민국",
      blurb: "궁궐·골목·야경을 지역별로 묶어, 걷는 동선 위주로 추천해요.",
      season: "3–5월, 9–11월",
      days: "2–4일",
      vibe: "도시 · 문화",
      routes: [
        {
          theme: "북촌·고궁 클래식",
          stops: [
            { title: "경복궁", tip: "한복 대여 시 입장 무료. 오전 개장 직후가 여유로워요." },
            { title: "북촌한옥마을", tip: "골목 사진 스팟을 천천히. 주말은 혼잡해요." },
            { title: "익선동·광장시장", tip: "익선 카페 후 광장시장에서 빈대떡·마약김밥." },
          ],
        },
        {
          theme: "성수·한강 감성",
          stops: [
            { title: "성수동 카페거리", tip: "팝업·편집숍 둘러보기. 평일 오전이 한산." },
            { title: "서울숲", tip: "짧은 산책으로 리셋. 피크닉 간식 추천." },
            { title: "여의도·한강공원", tip: "노을 타임에 맞춰 이동하면 분위기가 최고." },
          ],
        },
      ],
      spots: [
        { name: "남산서울타워", area: "용산", desc: "야경 명소. 케이블카 대기 시간을 감안하세요." },
        { name: "홍대·연남", area: "마포", desc: "거리 공연, 소품숍, 맛집. 밤에 더 살아나요." },
        { name: "창덕궁·후원", area: "종로", desc: "후원 해설 투어 예약하면 훨씬 좋아요." },
        { name: "동대문 DDP", area: "중구", desc: "야간 조명과 전시. 근처 야시장도 함께." },
      ],
    },
    vi: {
      name: "Seoul",
      country: "Hàn Quốc",
      blurb: "Cung điện, con hẻm và night view gom theo khu — ưu tiên lộ trình đi bộ.",
      season: "Th3–5, Th9–11",
      days: "2–4 ngày",
      vibe: "Đô thị · Văn hóa",
      routes: [
        {
          theme: "Bukchon & cung điện",
          stops: [
            { title: "Gyeongbokgung", tip: "Mặc hanbok vào cửa miễn phí. Đến sớm sẽ thoáng." },
            { title: "Làng Hanok Bukchon", tip: "Chụp ảnh chậm rãi; cuối tuần đông." },
            { title: "Ikseon-dong · Gwangjang", tip: "Cafe Ikseon rồi ăn bimok/kimchi pancake." },
          ],
        },
        {
          theme: "Seongsu & sông Hàn",
          stops: [
            { title: "Cafe Seongsu", tip: "Pop-up và concept store; sáng ngày thường ít người." },
            { title: "Seoul Forest", tip: "Đi bộ ngắn để nghỉ chân." },
            { title: "Công viên sông Hàn", tip: "Đến giờ hoàng hôn là đẹp nhất." },
          ],
        },
      ],
      spots: [
        { name: "N Seoul Tower", area: "Yongsan", desc: "Night view nổi tiếng; tính thời gian xếp hàng." },
        { name: "Hongdae · Yeonnam", area: "Mapo", desc: "Nhạc đường phố, shop nhỏ, đồ ăn — sống về đêm." },
        { name: "Changdeokgung", area: "Jongno", desc: "Nên đặt tour vườn Bí mật." },
        { name: "DDP", area: "Jung-gu", desc: "Ánh sáng đêm và triển lãm; gần chợ đêm." },
      ],
    },
  },
  {
    id: "busan",
    aliases: ["부산", "busan"],
    tones: ["#4ecdc4", "#1a535c"],
    mark: "BUSAN",
    ko: {
      name: "부산",
      country: "대한민국",
      blurb: "해변·시장·산복도로를 하루 단위로 나눠, 바다 감성을 살렸어요.",
      season: "5–6월, 9–10월",
      days: "2–3일",
      vibe: "바다 · 로컬",
      routes: [
        {
          theme: "해운대·광안 클래식",
          stops: [
            { title: "해운대 해수욕장", tip: "오전 산책 후 근처 카페. 성수기는 일찍." },
            { title: "동백섬·누리마루", tip: "짧은 트레일로 바다 전망을 즐기세요." },
            { title: "광안리 야경", tip: "광안대교 조명이 켜질 때 도착하면 완벽." },
          ],
        },
        {
          theme: "남포·영도 로컬",
          stops: [
            { title: "자갈치·국제시장", tip: "해산물과 길거리 음식. 가볍게 나눠 먹기 추천." },
            { title: "흰여울문화마을", tip: "절벽 위 골목 산책. 해질녘이 특히 예뻐요." },
            { title: "영도 카페거리", tip: "바다 뷰 카페에서 하루 마무리." },
          ],
        },
      ],
      spots: [
        { name: "감천문화마을", area: "사하", desc: "알록달록 골목과 전망. 편한 신발이 필수." },
        { name: "해동용궁사", area: "기장", desc: "바다 위 사찰. 일출 타임이 인기예요." },
        { name: "태종대", area: "영도", desc: "절벽과 등대 산책. 유람선 옵션도 있어요." },
        { name: "송도 해상케이블카", area: "서구", desc: "바다 위를 가로지르는 뷰. 대기열 확인." },
      ],
    },
    vi: {
      name: "Busan",
      country: "Hàn Quốc",
      blurb: "Bãi biển, chợ và làng trên đồi — chia theo ngày để giữ vibe biển.",
      season: "Th5–6, Th9–10",
      days: "2–3 ngày",
      vibe: "Biển · Bản địa",
      routes: [
        {
          theme: "Haeundae · Gwangalli",
          stops: [
            { title: "Bãi Haeundae", tip: "Đi bộ sáng rồi cafe. Mùa cao điểm đến sớm." },
            { title: "Dongbaek · Nurimaru", tip: "Đường mòn ngắn, view biển đẹp." },
            { title: "Đêm Gwangalli", tip: "Đến lúc cầu Gwangandaegyo sáng đèn." },
          ],
        },
        {
          theme: "Nampo · Yeongdo",
          stops: [
            { title: "Jagalchi · chợ quốc tế", tip: "Hải sản và đồ ăn đường phố." },
            { title: "Làng Huinnyeoul", tip: "Hẻm trên vách đá; chiều tà rất đẹp." },
            { title: "Cafe Yeongdo", tip: "Kết ngày với view biển." },
          ],
        },
      ],
      spots: [
        { name: "Gamcheon", area: "Saha", desc: "Làng màu sắc và view; mang giày êm." },
        { name: "Haedong Yonggungsa", area: "Gijang", desc: "Chùa trên biển; bình minh rất đông." },
        { name: "Taejongdae", area: "Yeongdo", desc: "Vách đá và hải đăng; có thuyền ngắm cảnh." },
        { name: "Cáp treo Songdo", area: "Seo-gu", desc: "Bay trên biển; kiểm tra hàng chờ." },
      ],
    },
  },
  {
    id: "tokyo",
    aliases: ["도쿄", "동경", "tokyo", "東京"],
    tones: ["#ff6b6b", "#2d3436"],
    mark: "TOKYO",
    ko: {
      name: "도쿄",
      country: "일본",
      blurb: "구역별로 하루를 잡으면 이동이 편해요. JR·지하철 패스를 미리 확인하세요.",
      season: "3–4월, 10–11월",
      days: "3–5일",
      vibe: "메가시티 · 쇼핑",
      routes: [
        {
          theme: "아사쿠사·스카이트리",
          stops: [
            { title: "센소지", tip: "아침 일찍 가면 사람이 적어요. 나카미세에서 간식." },
            { title: "스미다 강변", tip: "도보로 여유롭게 이동하며 스카이트리 뷰." },
            { title: "도쿄 스카이트리", tip: "석양 입장권이 인기. 사전 예약 추천." },
          ],
        },
        {
          theme: "시부야·하라주쿠",
          stops: [
            { title: "메이지신궁", tip: "숲길 산책으로 하루를 열어요." },
            { title: "하라주쿠·오모테산도", tip: "Takeshita와 카페, 편집숍을 천천히." },
            { title: "시부야 스크램블", tip: "석양 후 교차로와 루프톱 전망." },
          ],
        },
      ],
      spots: [
        { name: "팀랩 플래닛", area: "도요스", desc: "미디어아트 몰입 체험. 티켓은 미리 구매." },
        { name: "아키하바라", area: "치요다", desc: "애니·전자·메이드 카페. 취향 따라 코스 조절." },
        { name: "우에노 공원", area: "다이토", desc: "박물관과 벚꽃. 산책하기 좋은 오픈 공간." },
        { name: "오다이바", area: "미나토", desc: "바다·야경·쇼핑. 레인보우 브리지 뷰." },
      ],
    },
    vi: {
      name: "Tokyo",
      country: "Nhật Bản",
      blurb: "Chia theo khu sẽ đỡ di chuyển. Kiểm tra JR/pass tàu trước.",
      season: "Th3–4, Th10–11",
      days: "3–5 ngày",
      vibe: "Siêu đô thị · Mua sắm",
      routes: [
        {
          theme: "Asakusa · Skytree",
          stops: [
            { title: "Senso-ji", tip: "Đến sớm sẽ vắng. Ăn vặt ở Nakamise." },
            { title: "Bờ sông Sumida", tip: "Đi bộ ngắm Skytree." },
            { title: "Tokyo Skytree", tip: "Vé giờ hoàng hôn hot; đặt trước." },
          ],
        },
        {
          theme: "Shibuya · Harajuku",
          stops: [
            { title: "Meiji Jingu", tip: "Mở đầu ngày bằng lối đi trong rừng." },
            { title: "Harajuku · Omotesando", tip: "Takeshita, cafe và concept store." },
            { title: "Shibuya Scramble", tip: "Sau hoàng hôn: ngã tư và rooftop." },
          ],
        },
      ],
      spots: [
        { name: "teamLab Planets", area: "Toyosu", desc: "Nghệ thuật số nhập vai; mua vé trước." },
        { name: "Akihabara", area: "Chiyoda", desc: "Anime, điện tử, maid cafe." },
        { name: "Công viên Ueno", area: "Taito", desc: "Bảo tàng và hoa anh đào." },
        { name: "Odaiba", area: "Minato", desc: "Biển, night view, shopping." },
      ],
    },
  },
  {
    id: "danang",
    aliases: ["다낭", "danang", "da nang", "đà nẵng", "da-nang"],
    tones: ["#48cae4", "#023e8a"],
    mark: "ĐN",
    ko: {
      name: "다낭",
      country: "베트남",
      blurb: "해변 리조트와 호이안·바나힐을 하루씩 나누면 리듬이 좋아요.",
      season: "2–5월",
      days: "3–4일",
      vibe: "비치 · 휴양",
      routes: [
        {
          theme: "다낭 시내·미케 비치",
          stops: [
            { title: "미케 비치", tip: "오전 수영·선베드. 자외선 차단 필수." },
            { title: "한시장·드래곤브리지", tip: "시내 점심 후 저녁에 용다리 불쇼 확인." },
            { title: "미선 리조트 카페", tip: "해질녘 칵테일이나 카페로 여유롭게." },
          ],
        },
        {
          theme: "호이안 데이트립",
          stops: [
            { title: "호이안 올드타운", tip: "오후 도착해 노란 벽·랜턴 골목을 산책." },
            { title: "일본교·꼬꼬우", tip: "사진 스팟을 천천히. 저녁 전 강변 식사." },
            { title: "랜턴 야경", tip: "해가 지면 강에 등불을 띄우는 시간을 노리세요." },
          ],
        },
      ],
      spots: [
        { name: "바나힐", area: "언덕", desc: "골든브리지와 테마파크. 하루 일정으로 잡기." },
        { name: "마블마운틴", area: "논느억", desc: "동굴 사원 트레킹. 미끄러움 주의." },
        { name: "선짜 반도", area: "선짜", desc: "원숭이·케이블카·전망. 모기약 챙기세요." },
        { name: "호이안 야시장", area: "호이안", desc: "랜턴과 길거리 음식. 저녁 필수 코스." },
      ],
    },
    vi: {
      name: "Đà Nẵng",
      country: "Việt Nam",
      blurb: "Chia biển, Hội An và Bà Nà theo từng ngày sẽ rất nhịp nhàng.",
      season: "Th2–5",
      days: "3–4 ngày",
      vibe: "Biển · Nghỉ dưỡng",
      routes: [
        {
          theme: "Nội thành · Mỹ Khê",
          stops: [
            { title: "Biển Mỹ Khê", tip: "Bơi sáng; nhớ kem chống nắng." },
            { title: "Chợ Hàn · Cầu Rồng", tip: "Ăn trưa rồi tối xem phun lửa." },
            { title: "Cafe / resort Mỹ Khê", tip: "Hoàng hôn thư giãn với đồ uống." },
          ],
        },
        {
          theme: "Ngày Hội An",
          stops: [
            { title: "Phố cổ Hội An", tip: "Đến chiều để dạo tường vàng và đèn lồng." },
            { title: "Chùa Cầu · Cocoon", tip: "Chụp ảnh chậm; ăn ven sông trước tối." },
            { title: "Đêm đèn lồng", tip: "Ra sông lúc vừa tắt nắng." },
          ],
        },
      ],
      spots: [
        { name: "Bà Nà Hills", area: "Đồi", desc: "Cầu Vàng và công viên; dành cả ngày." },
        { name: "Ngũ Hành Sơn", area: "Non Nước", desc: "Hang động và chùa; cẩn thận trơn." },
        { name: "Bán đảo Sơn Trà", area: "Sơn Trà", desc: "Khỉ, cáp treo, view; mang thuốc muỗi." },
        { name: "Chợ đêm Hội An", area: "Hội An", desc: "Đèn lồng và đồ ăn đường phố." },
      ],
    },
  },
  {
    id: "hanoi",
    aliases: ["하노이", "hanoi", "hà nội", "ha noi"],
    tones: ["#c9a227", "#2c3e50"],
    mark: "HN",
    ko: {
      name: "하노이",
      country: "베트남",
      blurb: "호수·올드쿼터·카페 문화를 천천히 걷는 도시로 짜 봤어요.",
      season: "10–4월",
      days: "2–3일",
      vibe: "올드타운 · 카페",
      routes: [
        {
          theme: "호안끼엠·올드쿼터",
          stops: [
            { title: "호안끼엠 호수", tip: "아침 산책과 응옥썬 사원." },
            { title: "올드쿼터 골목", tip: "커피·기념품·길거리 음식. 오토바이 조심." },
            { title: "기차거리·야시장", tip: "주말 기차거리 또는 주말 야시장으로 마무리." },
          ],
        },
        {
          theme: "문화·강변",
          stops: [
            { title: "문묘(국립대학교)", tip: "오전 관람이 한산해요." },
            { title: "호치민 묘소·바딘", tip: "복장·운영시간 확인 필수." },
            { title: "웨스트레이크 카페", tip: "석양에 호수 뷰 카페에서 여유." },
          ],
        },
      ],
      spots: [
        { name: "에그커피 카페", area: "올드쿼터", desc: "하노이 대표 음료. 옥상 뷰 카페도 많아요." },
        { name: "템플 오브 리터러처", area: "동다", desc: "문묘. 역사와 사진 스팟을 함께." },
        { name: "롯터스 박물관", area: "떠이호", desc: "현대 건축과 전시. 호수 근처." },
        { name: "하롱베이(당일/1박)", area: "근교", desc: "크루즈 당일치기 또는 1박 코스." },
      ],
    },
    vi: {
      name: "Hà Nội",
      country: "Việt Nam",
      blurb: "Hồ, phố cổ và văn hóa cafe — lịch trình đi bộ chậm.",
      season: "Th10–4",
      days: "2–3 ngày",
      vibe: "Phố cổ · Cafe",
      routes: [
        {
          theme: "Hoàn Kiếm · phố cổ",
          stops: [
            { title: "Hồ Hoàn Kiếm", tip: "Đi bộ sáng và đền Ngọc Sơn." },
            { title: "Phố cổ", tip: "Cafe, quà lưu niệm, đồ ăn; cẩn thận xe máy." },
            { title: "Phố đường tàu · chợ đêm", tip: "Cuối tuần: đường tàu hoặc chợ đêm." },
          ],
        },
        {
          theme: "Văn hóa · hồ Tây",
          stops: [
            { title: "Văn Miếu", tip: "Tham quan buổi sáng sẽ thoáng." },
            { title: "Lăng Bác · Ba Đình", tip: "Kiểm tra trang phục và giờ mở cửa." },
            { title: "Cafe Hồ Tây", tip: "Hoàng hôn bên hồ." },
          ],
        },
      ],
      spots: [
        { name: "Cafe trứng", area: "Phố cổ", desc: "Thức uống đặc trưng; nhiều rooftop đẹp." },
        { name: "Văn Miếu", area: "Đống Đa", desc: "Di tích và góc chụp ảnh." },
        { name: "Bảo tàng Hà Nội", area: "Tây Hồ", desc: "Kiến trúc hiện đại gần hồ." },
        { name: "Vịnh Hạ Long", area: "Gần HN", desc: "Cruise trong ngày hoặc 1 đêm." },
      ],
    },
  },
  {
    id: "osaka",
    aliases: ["오사카", "osaka", "大阪"],
    tones: ["#f4a261", "#264653"],
    mark: "OSAKA",
    ko: {
      name: "오사카",
      country: "일본",
      blurb: "먹거리와 테마파크가 강점. 교토·나라를 당일치기로 붙이기 좋아요.",
      season: "3–5월, 10–11월",
      days: "2–4일",
      vibe: "미식 · 유원지",
      routes: [
        {
          theme: "성·도톤보리",
          stops: [
            { title: "오사카성", tip: "공원 산책과 성 전망. 벚꽃 시즌은 일찍." },
            { title: "신사이바시", tip: "쇼핑과 디저트. 저녁 전 도톤보리로." },
            { title: "도톤보리", tip: "타코야키·오코노미야키. 네온 야경이 핵심." },
          ],
        },
        {
          theme: "유니버설·베이",
          stops: [
            { title: "유니버설 스튜디오", tip: "하루 풀로. 익스프레스 패스 고려." },
            { title: "템포잔·해변", tip: "여유 있으면 관람차와 석양." },
          ],
        },
      ],
      spots: [
        { name: "쿠로몬 시장", area: "주오", desc: "해산물·꼬치. 아침~낮이 신선해요." },
        { name: "우메다 스카이빌딩", area: "기타", desc: "공중정원 전망. 석양 예약 추천." },
        { name: "신세카이", area: "난바 인근", desc: "레트로 거리와 쿠시카츠." },
        { name: "교토 당일치기", area: "근교", desc: "후시미이나리·기온을 짧게 묶기." },
      ],
    },
    vi: {
      name: "Osaka",
      country: "Nhật Bản",
      blurb: "Ẩm thực và công viên giải trí mạnh; dễ ghép Kyoto/Nara trong ngày.",
      season: "Th3–5, Th10–11",
      days: "2–4 ngày",
      vibe: "Ẩm thực · Công viên",
      routes: [
        {
          theme: "Lâu đài · Dotonbori",
          stops: [
            { title: "Osaka Castle", tip: "Công viên và view; mùa sakura đến sớm." },
            { title: "Shinsaibashi", tip: "Shopping rồi sang Dotonbori." },
            { title: "Dotonbori", tip: "Takoyaki, okonomiyaki và neon đêm." },
          ],
        },
        {
          theme: "USJ · vịnh",
          stops: [
            { title: "Universal Studios", tip: "Cả ngày; cân nhắc Express Pass." },
            { title: "Tempozan", tip: "Nếu còn sức: vòng quay và hoàng hôn." },
          ],
        },
      ],
      spots: [
        { name: "Chợ Kuromon", area: "Chuo", desc: "Hải sản và xiên que; sáng–trưa tươi." },
        { name: "Umeda Sky Building", area: "Kita", desc: "Vườn trên không; đặt giờ hoàng hôn." },
        { name: "Shinsekai", area: "Gần Namba", desc: "Phố retro và kushikatsu." },
        { name: "Kyoto trong ngày", area: "Gần Osaka", desc: "Fushimi Inari và Gion ngắn gọn." },
      ],
    },
  },
  {
    id: "bangkok",
    aliases: ["방콕", "bangkok", "กรุงเทพ"],
    tones: ["#e9c46a", "#9b2226"],
    mark: "BKK",
    ko: {
      name: "방콕",
      country: "태국",
      blurb: "사원·강·야시장을 더위로 지치지 않게 오전·저녁 위주로 짜 봤어요.",
      season: "11–2월",
      days: "3–4일",
      vibe: "사원 · 스트리트푸드",
      routes: [
        {
          theme: "왕궁·강변",
          stops: [
            { title: "왕궁·왓 프라깨우", tip: "오픈 직후 방문. 복장 규정 지키기." },
            { title: "왓 아룬", tip: "배를 타고 건너 가세요. 오후 빛이 예뻐요." },
            { title: "차오프라야 크루즈", tip: "석양 디너 크루즈로 더위를 피하기." },
          ],
        },
        {
          theme: "쇼핑·야시장",
          stops: [
            { title: "지아몬·엠쿼티어", tip: "에어컨 쇼핑몰로 한낮을 보내기." },
            { title: "아속·통로", tip: "루프톱 바나 카페에서 석양." },
            { title: "짜뚜짝 또는 야시장", tip: "주말이면 짜뚜짝, 평일이면 야시장." },
          ],
        },
      ],
      spots: [
        { name: "왓 아룬", area: "방콕야이", desc: "새벽·석양 사원. 강 건너 뷰가 최고." },
        { name: "카오산 로드", area: "프라나콘", desc: "배낭여행 거리. 밤에 활기가 넘쳐요." },
        { name: "아이콘시암", area: "클롱산", desc: "강변 대형몰과 푸드코트." },
        { name: "아요타야 당일", area: "근교", desc: "고대 유적 투어. 모자와 물 필수." },
      ],
    },
    vi: {
      name: "Bangkok",
      country: "Thái Lan",
      blurb: "Chùa, sông và chợ đêm — ưu tiên sáng/ tối để tránh nắng.",
      season: "Th11–2",
      days: "3–4 ngày",
      vibe: "Chùa · Street food",
      routes: [
        {
          theme: "Cung điện · sông",
          stops: [
            { title: "Grand Palace", tip: "Vào ngay giờ mở; mặc đúng quy định." },
            { title: "Wat Arun", tip: "Đi thuyền sang sông; chiều ánh sáng đẹp." },
            { title: "Cruise Chao Phraya", tip: "Dinner cruise lúc hoàng hôn." },
          ],
        },
        {
          theme: "Shopping · chợ đêm",
          stops: [
            { title: "Siam · EmQuartier", tip: "Trốn nắng trong mall ban ngày." },
            { title: "Asok · rooftop", tip: "Cafe/bar ngắm hoàng hôn." },
            { title: "Chatuchak / chợ đêm", tip: "Cuối tuần Chatuchak, ngày thường chợ đêm." },
          ],
        },
      ],
      spots: [
        { name: "Wat Arun", area: "Bangkok Yai", desc: "Chùa bình minh/hoàng hôn; view bên sông." },
        { name: "Khao San", area: "Phra Nakhon", desc: "Phố backpacker; sôi động về đêm." },
        { name: "ICONSIAM", area: "Khlong San", desc: "Mall ven sông và food court." },
        { name: "Ayutthaya trong ngày", area: "Gần BKK", desc: "Di tích cổ; mang mũ và nước." },
      ],
    },
  },
  {
    id: "paris",
    aliases: ["파리", "paris", "빠리"],
    tones: ["#adb5bd", "#212529"],
    mark: "PARIS",
    ko: {
      name: "파리",
      country: "프랑스",
      blurb: "대표 랜드마크를 구역별로 묶어, 걷기와 카페 타임을 남겼어요.",
      season: "4–6월, 9–10월",
      days: "3–5일",
      vibe: "예술 · 산책",
      routes: [
        {
          theme: "세느·아이콘",
          stops: [
            { title: "에펠탑·샹드마르스", tip: "오전 사진 후 피크닉. 정상 티켓은 예약." },
            { title: "세느 강변 산책", tip: "다리와 서점을 따라 천천히." },
            { title: "루브르 야간/저녁", tip: "늦은 입장 날을 노리면 대기줄이 줄어요." },
          ],
        },
        {
          theme: "몽마르뜨·레마레",
          stops: [
            { title: "사크레쾨르", tip: "언덕 전망과 거리 화가들." },
            { title: "레마레 골목", tip: "쇼핑·팔라펠·숨은 중정." },
            { title: "센강 유람선", tip: "석양 크루즈로 하루를 닫기." },
          ],
        },
      ],
      spots: [
        { name: "베르사유", area: "근교", desc: "하루 코스. 정원이 핵심이에요." },
        { name: "오르세 미술관", area: "7구", desc: "인상파 컬렉션. 루브르보다 아담." },
        { name: "개선문·샹젤리제", area: "8구", desc: "전망대와 쇼핑 거리." },
        { name: "라틴 지구", area: "5구", desc: "서점·카페·판테온 산책." },
      ],
    },
    vi: {
      name: "Paris",
      country: "Pháp",
      blurb: "Gom landmark theo khu, chừa thời gian đi bộ và cafe.",
      season: "Th4–6, Th9–10",
      days: "3–5 ngày",
      vibe: "Nghệ thuật · Dạo bộ",
      routes: [
        {
          theme: "Seine · biểu tượng",
          stops: [
            { title: "Tháp Eiffel", tip: "Chụp sáng rồi picnic; đặt vé lên đỉnh." },
            { title: "Dạo ven Seine", tip: "Cầu và hiệu sách cũ." },
            { title: "Louvre tối", tip: "Ngày mở cửa muộn sẽ ít xếp hàng hơn." },
          ],
        },
        {
          theme: "Montmartre · Le Marais",
          stops: [
            { title: "Sacré-Cœur", tip: "View đồi và họa sĩ đường phố." },
            { title: "Hẻm Le Marais", tip: "Shopping, falafel, sân trong ẩn." },
            { title: "Du thuyền Seine", tip: "Cruise lúc hoàng hôn." },
          ],
        },
      ],
      spots: [
        { name: "Versailles", area: "Gần Paris", desc: "Cả ngày; trọng tâm là khu vườn." },
        { name: "Musée d'Orsay", area: "Quận 7", desc: "Ấn tượng phái; gọn hơn Louvre." },
        { name: "Khải Hoàn Môn", area: "Quận 8", desc: "Đài quan sát và Champs-Élysées." },
        { name: "Quartier Latin", area: "Quận 5", desc: "Sách, cafe, Panthéon." },
      ],
    },
  },
];

const langBtn = document.getElementById("lang-btn");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const chipsEl = document.getElementById("chips");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const destCountry = document.getElementById("dest-country");
const destName = document.getElementById("dest-name");
const destBlurb = document.getElementById("dest-blurb");
const destMeta = document.getElementById("dest-meta");
const destArt = document.getElementById("dest-art");
const panelRoutes = document.getElementById("panel-routes");
const panelSpots = document.getElementById("panel-spots");
const tabs = document.querySelectorAll(".tab");

let lang = loadLang();
let activeId = null;

function loadLang() {
  try {
    const raw = localStorage.getItem(LANG_STORE_KEY);
    if (!raw) return "ko";
    const parsed = JSON.parse(raw);
    return parsed.lang === "vi" ? "vi" : "ko";
  } catch {
    return "ko";
  }
}

function saveLang(next) {
  lang = next;
  try {
    const raw = localStorage.getItem(LANG_STORE_KEY);
    const parsed = raw ? JSON.parse(raw) : { done: {}, customTasks: [] };
    parsed.lang = next;
    if (!parsed.done || typeof parsed.done !== "object") parsed.done = {};
    if (!Array.isArray(parsed.customTasks)) parsed.customTasks = [];
    localStorage.setItem(LANG_STORE_KEY, JSON.stringify(parsed));
  } catch {
    localStorage.setItem(
      LANG_STORE_KEY,
      JSON.stringify({ lang: next, done: {}, customTasks: [] })
    );
  }
}

function t(key) {
  const value = I18N[lang][key] ?? I18N.ko[key];
  return typeof value === "function" ? value : value || key;
}

function applyI18n() {
  document.documentElement.lang = lang === "vi" ? "vi" : "ko";
  document.body.dataset.lang = lang;
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = I18N[lang][key] ?? I18N.ko[key];
    if (typeof value === "string") el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = I18N[lang][key] ?? I18N.ko[key];
    if (typeof value === "string") el.placeholder = value;
  });
  langBtn.setAttribute("aria-pressed", String(lang === "vi"));
  langBtn.textContent = t("langBtn");
  renderChips();
  if (activeId) {
    const dest = DESTINATIONS.find((d) => d.id === activeId);
    if (dest) renderDestination(dest, false);
  }
}

function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function findDestination(query) {
  const q = normalize(query);
  if (!q) return null;
  return (
    DESTINATIONS.find((d) => {
      const names = [d.ko.name, d.vi.name, ...d.aliases].map(normalize);
      return names.some((n) => n === q || n.includes(q) || q.includes(n));
    }) || null
  );
}

function renderChips() {
  chipsEl.innerHTML = "";
  DESTINATIONS.forEach((dest) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip" + (dest.id === activeId ? " is-active" : "");
    btn.textContent = dest[lang].name;
    btn.setAttribute("role", "listitem");
    btn.addEventListener("click", () => {
      searchInput.value = dest[lang].name;
      showDestination(dest);
    });
    chipsEl.appendChild(btn);
  });
}

function setTab(tabName) {
  tabs.forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  panelRoutes.hidden = tabName !== "routes";
  panelSpots.hidden = tabName !== "spots";
  panelRoutes.classList.toggle("is-active", tabName === "routes");
  panelSpots.classList.toggle("is-active", tabName === "spots");
}

function renderDestination(dest, announce = true) {
  activeId = dest.id;
  const data = dest[lang];
  destCountry.textContent = data.country;
  destName.textContent = data.name;
  destBlurb.textContent = data.blurb;
  destArt.style.setProperty("--tone-a", dest.tones[0]);
  destArt.style.setProperty("--tone-b", dest.tones[1]);
  destArt.dataset.mark = dest.mark;

  destMeta.innerHTML = `
    <span class="meta-pill">${t("season")}: ${data.season}</span>
    <span class="meta-pill">${t("days")}: ${data.days}</span>
    <span class="meta-pill">${t("vibe")}: ${data.vibe}</span>
  `;

  panelRoutes.innerHTML = data.routes
    .map((route, index) => {
      const stops = route.stops
        .map(
          (stop, i) => `
          <li class="stop">
            <span class="stop-num">${i + 1}</span>
            <div class="stop-body">
              <strong>${stop.title}</strong>
              <p>${stop.tip}</p>
            </div>
          </li>`
        )
        .join("");
      return `
        <article class="day-card" style="--i:${index}">
          <div class="day-head">
            <h3 class="day-title">${t("dayLabel")(index + 1)}</h3>
            <p class="day-theme">${route.theme}</p>
          </div>
          <ol class="stops">${stops}</ol>
        </article>`;
    })
    .join("");

  panelSpots.innerHTML = data.spots
    .map(
      (spot, index) => `
      <article class="spot-card" style="--i:${index}">
        <div class="spot-top">
          <h3 class="spot-name">${spot.name}</h3>
          <span class="spot-area">${spot.area}</span>
        </div>
        <p class="spot-desc">${spot.desc}</p>
      </article>`
    )
    .join("");

  resultEl.hidden = false;
  renderChips();
  if (announce) {
    statusEl.textContent = t("found")(data.name);
  }
}

function showDestination(dest) {
  setTab("routes");
  renderDestination(dest, true);
  resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value;
  if (!query.trim()) {
    statusEl.textContent = t("emptyQuery");
    resultEl.hidden = true;
    activeId = null;
    renderChips();
    return;
  }
  const dest = findDestination(query);
  if (!dest) {
    statusEl.textContent = t("notFound");
    resultEl.hidden = true;
    activeId = null;
    renderChips();
    return;
  }
  searchInput.value = dest[lang].name;
  showDestination(dest);
}

langBtn.addEventListener("click", () => {
  saveLang(lang === "ko" ? "vi" : "ko");
  applyI18n();
});

searchForm.addEventListener("submit", handleSearch);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setTab(tab.dataset.tab));
});

applyI18n();
