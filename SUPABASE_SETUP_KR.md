# Supabase 데이터베이스 연결 가이드

이 가이드는 GTD-on-web 프로젝트를 Supabase 데이터베이스와 연결하는 방법을 단계별로 설명합니다.

## 🚀 빠른 시작

### 1단계: Supabase 프로젝트 생성

1. [Supabase 웹사이트](https://supabase.com)에 접속하여 로그인/회원가입
2. 대시보드에서 **"New Project"** 클릭
3. 프로젝트 정보 입력:
   - **프로젝트 이름**: `gtd-on-web` (원하는 이름 사용 가능)
   - **데이터베이스 비밀번호**: 강력한 비밀번호 설정 (잘 기억해두세요!)
   - **리전**: 가장 가까운 지역 선택 (한국의 경우 "Northeast Asia (Seoul)" 권장)
4. 프로젝트 생성이 완료될 때까지 대기 (~2분 소요)

### 2단계: 데이터베이스 스키마 설정

1. Supabase 프로젝트 대시보드의 왼쪽 사이드바에서 **SQL Editor** 클릭
2. **"New Query"** 버튼 클릭
3. 이 저장소의 `supabase-setup.sql` 파일 내용 전체를 복사
4. SQL Editor에 붙여넣기
5. **"Run"** 버튼을 클릭하여 실행

이 스크립트는 다음을 생성합니다:
- `tasks` 테이블과 모든 필요한 컬럼
- Row Level Security (RLS) 정책으로 CRUD 작업 허용
- `updated_at` 자동 업데이트 트리거
- 테스트용 샘플 데이터

### 3단계: Supabase 인증 정보 가져오기

1. Supabase 대시보드 왼쪽 사이드바에서 **Settings** → **API** 이동
2. 다음 값들을 복사해둡니다:
   - **Project URL** (프로젝트 URL 섹션에서)
   - **anon public** 키 (Project API keys 섹션에서)

### 4단계: 환경 변수 설정

**이 프로젝트는 이미 Vercel에 배포되어 있고 Supabase가 연결되어 있습니다!**

로컬에서 같은 Supabase 데이터베이스를 사용하려면:

1. Vercel 배포에서 환경 변수 가져오기:
   - [Vercel 대시보드](https://vercel.com/dashboard)에 접속
   - `GTD-on-web` 프로젝트 선택
   - **Settings** → **Environment Variables** 이동
   - `VITE_SUPABASE_URL`과 `VITE_SUPABASE_ANON_KEY` 값 복사

2. 프로젝트 루트 디렉토리에 `.env` 파일 생성:
```bash
cp .env.example .env
```

3. `.env` 파일을 열고 Vercel에서 복사한 값 붙여넣기:
```env
VITE_SUPABASE_URL=<Vercel에서 복사한 값>
VITE_SUPABASE_ANON_KEY=<Vercel에서 복사한 값>
```

이렇게 하면 로컬 개발 환경에서도 Vercel 배포와 같은 Supabase 데이터베이스를 사용하게 됩니다!

### 5단계: 앱 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 브라우저에서 `http://localhost:5173` 열기

4. 앱에 샘플 작업들이 표시되면 성공! 🎉

## ✅ 작동 확인

다음을 테스트하여 연결이 제대로 되었는지 확인하세요:

1. **작업 목록 로딩**: 페이지를 새로고침하면 기존 작업들이 표시되어야 합니다
2. **작업 추가**: 새 작업을 추가하고 목록에 나타나는지 확인
3. **작업 상태 변경**: 드롭다운에서 작업 상태를 변경
4. **작업 삭제**: 작업을 삭제하고 목록에서 사라지는지 확인

## 🔧 문제 해결

### "Supabase URL and Anon Key must be provided" 오류

- `.env` 파일이 프로젝트 루트에 있는지 확인
- `.env` 파일의 변수 이름이 정확한지 확인 (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- 개발 서버를 재시작 (`.env` 변경 후 필요)

### 작업이 표시되지 않음

1. 브라우저 콘솔 확인 (F12 → Console 탭)
2. `.env`의 Supabase 인증 정보가 올바른지 재확인
3. Supabase SQL Editor에서 `supabase-setup.sql` 스크립트를 실행했는지 확인
4. Supabase 대시보드 → Table Editor → tasks 테이블에 데이터가 있는지 확인

### 네트워크 오류 / CORS 오류

- Supabase 프로젝트 URL이 올바른지 확인
- Supabase 프로젝트가 일시 중지되지 않았는지 확인 (무료 플랜은 1주일 비활성 시 일시 중지)
- Supabase 대시보드에서 프로젝트가 활성 상태인지 확인

### 데이터베이스 권한 오류

SQL Editor에서 다음 쿼리를 실행하여 RLS 정책이 활성화되었는지 확인:

```sql
SELECT * FROM pg_policies WHERE tablename = 'tasks';
```

4개의 정책이 표시되어야 합니다 (select, insert, update, delete).

## 📊 데이터베이스 구조

### tasks 테이블

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| id | UUID | 기본 키 (자동 생성) |
| title | TEXT | 작업 제목 (필수) |
| description | TEXT | 작업 설명 (선택) |
| status | TEXT | 상태: inbox, next, waiting, someday, done |
| priority | TEXT | 우선순위: low, medium, high |
| created_at | TIMESTAMP | 생성 시각 (자동) |
| updated_at | TIMESTAMP | 수정 시각 (자동 업데이트) |

## 🔒 보안 참고사항

현재 설정은 개발/테스트용으로 모든 사용자가 모든 작업에 접근할 수 있습니다.

프로덕션 환경에서는:
1. Supabase Authentication 활성화
2. RLS 정책을 사용자별로 제한
3. 사용자 인증 구현

예시 (향후 개선):
```sql
-- 각 사용자가 자신의 작업만 볼 수 있도록
create policy "Users can view their own tasks" on tasks
  for select using (auth.uid() = user_id);
```

## 🎓 추가 학습 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- [React와 Supabase 통합](https://supabase.com/docs/guides/getting-started/tutorials/with-react)

## 💡 팁

1. **Supabase Table Editor**: 대시보드의 Table Editor 탭에서 GUI를 통해 데이터를 직접 보고 편집할 수 있습니다. 개발 중 데이터 확인에 유용합니다.

2. **실시간 구독**: Supabase는 PostgreSQL의 변경사항을 실시간으로 수신하는 기능을 지원합니다. 향후 여러 사용자가 동시에 작업할 때 유용하게 사용할 수 있습니다.
   ```javascript
   // 예시: 실시간 구독
   supabase
     .channel('tasks')
     .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, 
       payload => console.log('Change received!', payload))
     .subscribe()
   ```

3. **데이터베이스 백업**: 
   - Supabase 대시보드 → Database → Backups에서 수동/자동 백업 설정 가능
   - 무료 플랜: 수동 백업 (언제든지 생성 가능)
   - Pro 플랜 이상: 자동 일일 백업 + Point-in-Time Recovery (PITR)
   - 중요한 변경 전에는 항상 백업을 먼저 생성하는 것을 권장

4. **API 로그 확인**: Supabase 대시보드의 Logs 탭에서 모든 API 호출, 쿼리 성능, 에러를 실시간으로 확인할 수 있습니다. 디버깅에 매우 유용합니다.

## 🚀 다음 단계

연결이 완료되었다면 다음을 고려해보세요:

1. 사용자 인증 추가 (Supabase Auth)
2. 작업 우선순위 기능 활용
3. 작업 필터링 및 검색 기능
4. 작업 기한 추가
5. 실시간 협업 기능
6. 모바일 반응형 디자인 개선

---

문제가 계속되면 이슈를 열어주세요!
