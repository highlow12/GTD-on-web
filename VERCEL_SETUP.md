# Vercel 배포에서 환경 변수 가져오기

이 프로젝트는 이미 Vercel에 배포되어 Supabase와 연결되어 있습니다.

## 빠른 설정 (로컬 개발용)

### 방법 1: Vercel 대시보드에서 직접 복사

1. https://vercel.com/dashboard 접속
2. `GTD-on-web` 프로젝트 클릭
3. **Settings** 탭 클릭
4. 왼쪽 메뉴에서 **Environment Variables** 클릭
5. 다음 변수들을 찾아 복사:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

6. 프로젝트 루트에 `.env` 파일 생성:
```bash
cp .env.example .env
```

7. `.env` 파일에 복사한 값 붙여넣기

### 방법 2: Vercel CLI 사용 (자동)

Vercel CLI가 있다면 자동으로 환경 변수를 가져올 수 있습니다:

```bash
# Vercel CLI 설치 (아직 없다면)
npm install -g vercel

# Vercel 프로젝트와 연결
vercel link

# 환경 변수 가져오기
vercel env pull .env
```

이 명령은 Vercel에 설정된 모든 환경 변수를 자동으로 `.env` 파일에 다운로드합니다.

## 확인

환경 변수가 제대로 설정되었는지 확인:

```bash
# .env 파일 확인 (실제 값은 표시되지 않음)
cat .env | grep VITE_SUPABASE
```

다음과 같이 표시되어야 합니다:
```
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=eyJ...
```

## 앱 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 을 열면 Vercel 배포와 같은 데이터베이스를 사용하는 앱을 볼 수 있습니다!

## 주의사항

⚠️ **로컬과 프로덕션이 같은 데이터베이스를 사용합니다**
- 로컬 개발 시 추가/수정/삭제한 데이터가 실제 프로덕션 데이터베이스에 반영됩니다
- 테스트 시 주의하세요!

💡 **개발용 별도 환경이 필요하다면:**
1. Supabase에서 새 프로젝트 생성 (개발용)
2. `supabase-setup.sql` 스크립트 실행
3. `.env.local` 파일에 개발용 환경 변수 설정
4. Vite는 `.env.local`을 우선적으로 사용합니다

## 배포

코드 변경 사항을 push하면 Vercel이 자동으로 배포합니다:

```bash
git add .
git commit -m "your changes"
git push
```

Vercel은 main 브랜치(또는 설정된 브랜치)에 push하면 자동으로 빌드하고 배포합니다.
