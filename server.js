const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 승인행정사 관련 주제 데이터
const topics = [
  {
    id: 1,
    title: "건설업 인허가 절차 완벽 가이드",
    description: "건설업 등록부터 변경신고까지 필요한 모든 서류와 절차",
    category: "건설업"
  },
  {
    id: 2,
    title: "식품위생법 영업신고 체크리스트",
    description: "음식점, 카페 창업 시 반드시 알아야 할 위생 허가 절차",
    category: "식품위생"
  },
  {
    id: 3,
    title: "외국인 체류자격 변경 신청 방법",
    description: "비자 변경부터 서류 준비까지 상세 안내",
    category: "출입국"
  },
  {
    id: 4,
    title: "개인정보보호법 준수 가이드",
    description: "사업장에서 반드시 지켜야 할 개인정보 관리 방법",
    category: "법률"
  },
  {
    id: 5,
    title: "건축물 용도변경 허가 절차",
    description: "상가, 주택 용도변경 시 필요한 서류와 주의사항",
    category: "건축"
  },
  {
    id: 6,
    title: "통신판매업 신고 완벽 정리",
    description: "온라인 쇼핑몰 창업 시 필수 인허가 절차",
    category: "전자상거래"
  },
  {
    id: 7,
    title: "법인설립 등기 실전 가이드",
    description: "주식회사 설립부터 사업자등록까지 단계별 안내",
    category: "법인"
  },
  {
    id: 8,
    title: "환경오염물질 배출시설 신고방법",
    description: "제조업 사업장의 환경 관련 인허가 완벽 정리",
    category: "환경"
  },
  {
    id: 9,
    title: "주류판매업 면허 취득 가이드",
    description: "일반음식점 주류판매부터 주류도매까지",
    category: "주류"
  },
  {
    id: 10,
    title: "행정심판 청구 실무 가이드",
    description: "행정처분 불복 시 행정심판 청구 방법과 절차",
    category: "행정구제"
  }
];

// API 엔드포인트

// 주제 추천
app.get('/api/topics', (req, res) => {
  // 랜덤으로 5개 주제 추천
  const shuffled = [...topics].sort(() => 0.5 - Math.random());
  const recommended = shuffled.slice(0, 5);
  res.json({ success: true, topics: recommended });
});

// 글 생성
app.post('/api/generate-content', (req, res) => {
  const { topic } = req.body;
  
  // 실제로는 AI API를 호출하지만, 여기서는 개선된 템플릿 생성
  const content = generateBlogContent(topic);
  
  res.json({ success: true, content });
});

// 이미지 프롬프트 생성
app.post('/api/generate-image-prompt', (req, res) => {
  const { topic } = req.body;
  
  const prompt = generateImagePrompt(topic);
  
  res.json({ success: true, prompt });
});

// 개선된 블로그 콘텐츠 생성 함수 (인기 블로그 패턴 적용)
function generateBlogContent(topic) {
  // 공통 시작 부분
  const intro = `**${topic.description}에 대해 궁금하신 분들이 정말 많으십니다.** 저는 10년 넘게 승인행정사로 일하면서 이 분야 수백 건의 업무를 처리해왔습니다.

오늘은 제가 현장에서 직접 겪은 생생한 경험과 노하우를 낱낱이 공개하겠습니다. 복잡해 보이지만 정확한 방법만 알면 누구나 성공할 수 있습니다.

[이미지1: ${topic.category} 관련 대표 이미지]

지금부터 ${topic.title}의 모든 것을 실전 사례와 함께 자세히 알아보겠습니다. 끝까지 읽으시면 시행착오 없이 한 번에 처리하실 수 있을 거예요!

​

> **${topic.title} - 기본 개념부터 이해하기**

**많은 분들이 ${topic.category} 분야의 인허가를 어려워하시는데, 기본 개념만 정확히 알면 절반은 성공입니다.** 2024년 현재 기준으로 전국에서 매년 수만 건의 관련 신고가 이루어지고 있습니다.`;

  const imageMarkers = [
    "\n\n[이미지2: 필요 서류 체크리스트]\n\n",
    "\n\n[이미지3: 단계별 절차 흐름도]\n\n",
    "\n\n[이미지4: 자주 하는 실수 사례]\n\n",
    "\n\n[이미지5: 비용 및 기간 안내표]\n\n"
  ];

  // 카테고리별 맞춤 콘텐츠
  let mainContent = '';
  
  switch(topic.category) {
    case "건설업":
      mainContent = `

먼저 여러분이 하려는 공사가 어떤 업종에 해당하는지 정확히 파악하는 것이 중요합니다. 일반건설업인지 전문건설업인지에 따라 요구사항이 완전히 다르기 때문입니다.

제가 최근에 상담했던 이 대표님의 경우, 인테리어 공사를 하시려고 하셨는데 실내건축공사업이 필요한지 몰라서 계약을 놓칠 뻔 하셨습니다.
${imageMarkers[0]}

> **반드시 준비해야 할 필수 서류**

**서류 하나라도 빠지면 바로 반려됩니다.** 10년간 수백 건을 처리하면서 만든 완벽한 체크리스트를 공개합니다.

**1. 법인 관련 서류 (법인인 경우)**
- 법인등기부등본 (최근 3개월 이내)
- 정관 사본
- 법인인감증명서

**2. 기술인력 서류 (가장 중요!)**
- 기술자 경력증명서 (건설산업정보센터 발급)
- 국가기술자격증 사본
- 재직증명서
- 건강보험자격득실확인서

여기서 주의! 기술자 경력증명서는 발급에 3~5일 걸립니다. 많은 분들이 이걸 모르고 급하게 신청하시다가 일정이 늦어지는 경우가 많습니다.
${imageMarkers[1]}

> **단계별 상세 절차 (실전 가이드)**

**전체 소요기간은 평균 2~3주입니다.** 하지만 제대로 준비하면 2주 안에도 가능합니다.

**STEP 1: 사전 준비 (3~5일)**

업종 확정과 요건 확인이 가장 중요합니다. 건설산업기본법에서 정한 29개 전문건설업 중 어떤 업종인지 정확히 파악해야 합니다.

실제 사례를 보면, 한 업체에서 통신공사를 하려고 전기공사업으로 신청했다가 반려된 적이 있습니다. 통신공사는 정보통신공사업으로 따로 분류되기 때문입니다.

**STEP 2: 서류 작성 및 제출 (5~7일)**

모든 서류는 최근 3개월 이내 발급분이어야 합니다. 온라인 제출이 가능한 지자체가 늘고 있으니 미리 확인하세요.

**STEP 3: 심사 및 현장 확인 (7~10일)**

사무실은 반드시 근린생활시설 용도여야 합니다. 주거용 오피스텔은 절대 불가능합니다. 이것 때문에 반려되는 경우가 정말 많습니다.

**STEP 4: 등록증 발급 (1~2일)**

모든 심사 완료 후 등록증이 발급되면 즉시 영업 가능합니다.
${imageMarkers[2]}

> **자본금과 기술인력 요건**

**업종마다 요구되는 자본금이 다릅니다.** 2024년 기준으로 정확한 금액을 알려드리겠습니다.

- 토목건축공사업: 7억원
- 토목/건축공사업: 각 5억원
- 전문건설업: 7천만원 ~ 1억 5천만원 (업종별 상이)

자본금은 신청일 당일까지 실제 보유하고 있어야 합니다. 일시 차입금은 인정되지 않으며, 이를 위반하면 부정등록으로 처벌받습니다.

기술인력도 매우 중요합니다. 각 업종마다 필요한 자격증과 인원이 다르므로, 반드시 사전에 확인하셔야 합니다.
${imageMarkers[3]}

> **절대 하면 안 되는 실수들**

**10년간 보면서 가장 많이 본 실수들입니다.** 이것만 피해도 성공 확률이 90% 이상입니다.

❌ **실수 1: 주거용 오피스텔을 사무실로 사용**
→ 반드시 근린생활시설이어야 합니다. 계약 전 건물등기부등본으로 확인하세요.

❌ **실수 2: 기술자 중복 등록**
→ 한 기술자가 여러 회사에 동시 등록되면 모두 무효 처리됩니다.

❌ **실수 3: 자본금 일시 입금**
→ 심사 기간 내내 자본금이 유지되어야 합니다.

❌ **실수 4: 서류 유효기간 경과**
→ 3개월이 지나면 모든 서류를 재발급해야 합니다.

실제로 제가 상담했던 한 업체는 이런 실수들로 무려 5번이나 반려되었습니다. 재계약 비용만 수백만원이 들었죠.`;
      break;

    case "식품위생":
      mainContent = `

식품위생법에 따른 영업신고는 생각보다 복잡하지 않습니다. 다만 위생 기준을 정확히 지켜야 하고, 필수 교육을 이수해야 합니다.

최근 상담했던 박 사장님은 카페를 오픈하시려고 했는데, 위생교육을 미리 받지 않아서 오픈이 한 달이나 늦어졌습니다. 이런 일이 없도록 체계적으로 준비하셔야 합니다.
${imageMarkers[0]}

> **영업신고 대상 및 종류**

**식품위생법상 영업신고가 필요한 업종은 다음과 같습니다:**

- 일반음식점 (주류 판매 가능)
- 휴게음식점 (주류 판매 불가)
- 제과점
- 식품소분업
- 식품판매업

1,500만원 이하의 경미한 공사는 신고 없이도 가능하지만, 안전을 위해 신고하시는 걸 권장합니다.
${imageMarkers[1]}

> **필수 준비 서류 및 시설 기준**

**서류는 간단하지만 시설 기준이 까다롭습니다.** 인테리어 시작 전에 반드시 확인하세요.

**필요 서류:**
- 영업신고서
- 건물 임대차계약서
- 수질검사 성적서 (지하수 사용 시)
- 위생교육 이수증
- 시설 배치도

**시설 기준 (반드시 충족!):**
- 조리장과 객석 명확히 구분
- 환기시설 설치 필수
- 식자재 보관시설 구비
- 화장실 설치 (일정 규모 이상)
- 급수시설 및 폐수처리시설

제가 상담했던 한 음식점은 환기시설을 제대로 설치하지 않아 신고가 반려되었습니다. 추가 공사비만 300만원이 더 들었죠.
${imageMarkers[2]}

> **위생교육 이수는 필수!**

**영업신고 전에 반드시 위생교육을 이수해야 합니다.** 이걸 모르는 분들이 정말 많습니다.

- 교육 기관: 한국식품산업협회
- 교육 방법: 온라인 수강 가능
- 소요 시간: 약 2시간
- 비용: 약 2~3만원

온라인으로 신청하면 당일 이수 가능하지만, 증명서 발급까지는 1~2일 걸립니다. 여유있게 미리 받으세요.
${imageMarkers[3]}

> **신고 절차 및 현장 확인**

**전체 소요기간은 약 1~2주입니다.**

1. 위생교육 이수 (필수!)
2. 관할 보건소에 서류 제출
3. 보건소 담당자 현장 방문
4. 시설 기준 적합 여부 확인
5. 영업신고증 발급

현장 확인에서 가장 많이 지적되는 부분은 조리장 환기시설과 화장실입니다. 인테리어 업체와 사전에 꼭 상의하세요.`;
      break;

    case "출입국":
      mainContent = `

체류자격 변경은 서류 하나만 잘못 준비해도 불허가될 수 있습니다. 특히 재심사에는 몇 개월이 걸리기 때문에 처음부터 정확하게 준비하는 것이 중요합니다.

최근에 상담했던 김 씨는 유학비자에서 취업비자로 변경하려다가 서류 미비로 2차례 반려되셨습니다. 결국 저희를 통해 3개월 만에 해결하셨죠.
${imageMarkers[0]}

> **체류자격 변경의 종류**

**가장 많이 하시는 체류자격 변경 유형입니다:**

- 유학(D-2) → 구직(D-10)
- 방문취업(H-2) → 거주(F-2)
- 단기방문(C-3) → 결혼이민(F-6)
- 연수(D-4) → 취업(E-7)

각 변경마다 요구되는 서류와 심사 기준이 완전히 다릅니다.
${imageMarkers[1]}

> **공통 필수 서류**

**모든 체류자격 변경에 공통적으로 필요한 서류입니다:**

1. 체류자격변경허가신청서
2. 여권 및 외국인등록증
3. 수수료 납부 영수증 (6만원)
4. 체류지 입증서류 (임대차계약서 등)
5. 변경 사유 입증서류

여기에 추가로 각 체류자격별 특수 서류가 필요합니다.

**취업비자 변경 시 추가 서류:**
- 근로계약서 원본
- 회사 사업자등록증 사본
- 학력/경력 증명서
- 표준산업분류 증빙서류

**결혼이민비자 신청 시 추가 서류:**
- 혼인관계증명서
- 배우자 신원보증서
- 소득 증빙서류 (최근 1년치)
- 주거 입증서류
${imageMarkers[2]}

> **신청 절차 및 소요기간**

**전체 처리 기간은 평균 2~4주입니다.** 다만 서류 미비 시 몇 개월이 걸릴 수도 있습니다.

**STEP 1: 서류 준비 (1~2주)**
각 체류자격에 맞는 서류를 빠짐없이 준비합니다. 번역 공증이 필요한 서류는 미리 준비하세요.

**STEP 2: 출입국관리사무소 방문 신청**
관할 출입국사무소에 직접 방문하여 신청합니다. 일부 경우 온라인 신청도 가능합니다.

**STEP 3: 심사 대기 (2~4주)**
담당 심사관이 서류를 검토하고 필요 시 추가 서류를 요청합니다.

**STEP 4: 결과 통보 및 외국인등록증 재발급**
승인되면 새로운 체류자격으로 외국인등록증이 재발급됩니다.
${imageMarkers[3]}

> **불허가 사유 및 주의사항**

**이것 때문에 불허가되는 경우가 가장 많습니다:**

🚨 **체류기간 만료 후 신청**
→ 과태료 부과 + 출국명령 가능성
→ 최소 30일 전에는 신청하세요

🚨 **소득 요건 미충족 (결혼이민비자)**
→ 최저생계비 이상의 안정적 소득 필요

🚨 **범죄 경력 또는 체류 위반 기록**
→ 단 한 번의 위반도 치명적입니다

🚨 **서류 위조 또는 허위 진술**
→ 영구 입국 금지 처분

실제로 체류기간 만료 후 신청했다가 강제출국 당한 사례를 여러 번 봤습니다. 반드시 기간 내에 신청하세요.`;
      break;

    default:
      mainContent = `

${topic.category} 분야의 인허가는 관련 법령을 정확히 이해하고 준비하는 것이 핵심입니다.
${imageMarkers[0]}

> **필수 준비사항**

**기본적으로 필요한 서류와 요건은 다음과 같습니다:**

1. 신청서 및 첨부서류
2. 사업장 관련 증빙
3. 자격 요건 증명서류
4. 기타 법령에서 정한 서류

각 서류는 최신 발급본이어야 하며, 유효기간을 반드시 확인하세요.
${imageMarkers[1]}

> **신청 절차**

**전체 처리 기간은 평균 2~4주입니다.**

1. 사전 상담 및 요건 확인
2. 서류 준비
3. 관할 기관에 신청
4. 서류 심사 및 현장 확인
5. 허가증 또는 신고증 발급

처음 하시는 분들은 전문가 상담을 받으시는 걸 추천드립니다.
${imageMarkers[2]}

> **주의사항 및 자주 하는 실수**

❌ 서류 유효기간 경과
❌ 필수 교육 미이수
❌ 요건 미충족 상태에서 신청
❌ 허위 서류 제출

이런 실수들은 충분히 예방 가능합니다.`;
  }

  // 마무리 부분
  const conclusion = `

​

> **비용과 처리기간 총정리**

**실제로 드는 비용과 시간을 투명하게 공개합니다.**
${imageMarkers[4]}

**공과금 및 수수료:**
- 신청 수수료: 약 5~15만원
- 제증명 발급비: 약 5~10만원
- 교육비 (필요 시): 약 2~5만원

**행정사 대행 수수료:**
- 단순 업무: 30~50만원
- 복잡한 업무: 50~150만원

직접 하시면 수수료는 절약되지만, 시행착오로 인한 시간 손실과 재계약 비용을 고려하면 전문가를 이용하는 것도 좋은 선택입니다.

​

> **전문가 상담이 필요한 이유**

**한 번의 실수로 몇 개월이 지연될 수 있습니다.** 제 경험상 전문가를 통하면:

✅ 1차 제출로 통과 확률 95% 이상
✅ 처리기간 평균 30% 단축
✅ 법령 변경사항 실시간 반영
✅ 사후 변경신고까지 원스톱 처리

최근 상담했던 한 고객님은 직접 3번 시도하다 실패하신 후 저희를 찾아오셨습니다. 정확한 서류 준비로 단 2주 만에 모든 절차를 완료하셨죠.

---

**지금까지 ${topic.title}의 모든 것을 실전 사례와 함께 알아봤습니다.** 

복잡해 보이지만 체계적으로 준비하면 누구나 성공할 수 있습니다. 준비하시다가 막히는 부분이 있거나 궁금한 점이 있으시면 언제든 댓글로 문의 주세요!

제가 10년간 쌓은 경험을 바탕으로 최선을 다해 답변드리겠습니다. 여러분의 성공을 진심으로 응원합니다! 💪

​

📞 **승인행정사 김수빈 사무소**
✉️ ${topic.category} 전문 상담 및 대행
🏢 빠르고 정확한 원스톱 처리
⭐ 10년 경력의 전문 행정사가 직접 상담`;

  return intro + mainContent + conclusion;
}

// 이미지 프롬프트 생성 함수
function generateImagePrompt(topic) {
  const prompts = {
    "건설업": "Professional construction site office with permits and documents on desk, modern clean design, business professional atmosphere, blueprints visible, bright lighting, Korean administrative office style",
    "식품위생": "Clean modern restaurant kitchen with hygiene certification on wall, stainless steel equipment, professional food safety environment, bright and sanitary, commercial kitchen setup",
    "출입국": "Immigration office desk with passport, visa documents and stamps, professional government office setting, international travel documents, clean organized workspace, official atmosphere",
    "법률": "Professional law office desk with legal documents and Korean law books, scales of justice symbol, trustworthy blue tones, modern corporate legal environment",
    "건축": "Architectural office with building blueprints and 3D models, technical drawings on large desk, professional construction planning atmosphere, modern architecture office",
    "전자상거래": "Modern e-commerce business setup with laptop showing online store, business registration documents nearby, clean professional home office, digital business concept",
    "법인": "Corporate business registration office, company seal and documents on executive desk, professional navy blue corporate atmosphere, modern business establishment concept",
    "환경": "Environmental compliance office with eco-friendly certifications, green business documents, sustainability reports, professional environmental management setting",
    "주류": "Professional liquor license office with alcohol permits and bottles display case in background, upscale business licensing atmosphere, legal alcohol distribution concept",
    "행정구제": "Government administrative appeals office, legal petition documents on desk, official government building interior, professional public service environment"
  };

  return prompts[topic.category] || "Professional Korean administrative services office with documents and consultation setup, trustworthy business atmosphere, modern clean design";
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ 승인행정사 블로그 도우미 서버 실행 중`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📝 개선된 블로그 콘텐츠 생성 준비 완료!`);
});
