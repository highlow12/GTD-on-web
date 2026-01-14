-- GTD Tasks 테이블 생성
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text default 'inbox' check (status in ('inbox', 'next', 'waiting', 'someday', 'done')),
  priority text default 'medium' check (priority in ('low', 'medium', 'high')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) 활성화
alter table tasks enable row level security;

-- 모든 사용자가 읽을 수 있도록 허용 (개발용 - 나중에 인증 추가 시 수정)
create policy "Enable read access for all users" on tasks
  for select using (true);

-- 모든 사용자가 삽입할 수 있도록 허용 (개발용)
create policy "Enable insert access for all users" on tasks
  for insert with check (true);

-- 모든 사용자가 수정할 수 있도록 허용 (개발용)
create policy "Enable update access for all users" on tasks
  for update using (true);

-- 모든 사용자가 삭제할 수 있도록 허용 (개발용)
create policy "Enable delete access for all users" on tasks
  for delete using (true);

-- updated_at 자동 업데이트 함수
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- updated_at 트리거
create trigger update_tasks_updated_at before update on tasks
  for each row execute procedure update_updated_at_column();

-- 샘플 데이터 추가
insert into tasks (title, description, status, priority) values
  ('Supabase 연결 테스트', '데이터베이스가 정상적으로 연결되었는지 확인', 'done', 'high'),
  ('GTD 앱 UI 디자인', 'Getting Things Done 앱의 사용자 인터페이스 설계', 'next', 'high'),
  ('작업 추가 기능 구현', '새로운 작업을 추가할 수 있는 폼 만들기', 'inbox', 'medium'),
  ('작업 상태 변경 기능', '드래그 앤 드롭으로 작업 상태 변경', 'someday', 'low');
