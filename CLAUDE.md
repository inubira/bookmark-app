# CLAUDE.md

## 프로젝트 개요

회사 부서별 북마크 크롬 확장프로그램.
새 탭을 열면 부서별로 정리된 북마크를 보여준다.
북마크 데이터는 Google Sheets에서 읽어온다.

## 기술 스택

- Chrome Extension (Manifest V3)
- Vanilla JS / HTML / CSS (별도 프레임워크 없음)
- Google Sheets API (북마크 데이터 소스)

## 부서 구조

| 탭 이름 | 설명 |
|---------|------|
| 전체 | 모든 부서 북마크 통합 표시 |
| 개발 | 개발팀 전용 북마크 |
| 디자인 | 디자인팀 전용 북마크 |
| 마케팅 | 마케팅팀 전용 북마크 |

## 데이터 흐름

1. 크롬 새 탭 열기 → `newtab.html` 로드
2. Google Sheets API 호출 → 북마크 데이터 fetch
3. 부서 필터링 → 탭별로 분류하여 렌더링

## 파일 구조 (예정)

```
bookmark-app/
├── manifest.json       # Chrome Extension 설정
├── newtab.html         # 새 탭 페이지
├── newtab.js           # 메인 로직 (데이터 fetch, 렌더링)
├── newtab.css          # 스타일
└── config.js           # Google Sheets API 키, 시트 ID 등 설정값
```

## Google Sheets 연동

- Sheets 데이터는 공개 CSV URL 또는 Google Sheets API v4로 읽어온다.
- 시트 컬럼 구조: `부서 | 이름 | URL | 설명` (순서 변경 시 `config.js` 수정)
- API 키와 시트 ID는 `config.js`에서 관리한다. 절대 하드코딩하지 않는다.

## 개발 시 주의사항

- Manifest V3 기준으로 작성한다 (MV2 API 사용 금지).
- 새 탭 페이지이므로 `chrome.storage` 또는 외부 fetch만 사용 가능.
- API 키 등 민감 정보는 커밋하지 않는다.
- 부서 목록(`전체`, `개발`, `디자인`, `마케팅`)은 `config.js`에서 관리한다.
