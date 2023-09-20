import * as S from '@/styles/user/signup.style';

const SignupComponent = ({ getter, setter }) => {
  const num = Math.floor(Math.random() * 5)+1; 

  const onChange = (e) => {
    const { name, value } = e.target;
    setter({
      ...getter,
      [name]: value,
    });
  };

  return (
    <S.SignupLayout bgnum={num}>
      <S.SignupContainer>
        <div className="box">
          <img className="logo" src="../../src/assets/dkslhead.svg" />
          <h1> 회원가입 </h1>
        </div>
        <hr />
        <S.SignupInputBox>
          <input type='text' name='name' onChange={e => onChange(e)} placeholder="이름를 입력하세요." />
          <input type='text' name='id' onChange={e => onChange(e)} placeholder="아이디를 입력하세요." />
          <input type='password' name='pw' onChange={e => onChange(e)} placeholder="비밀번호를 입력하세요." />
          <input type='text' name='email' onChange={e => onChange(e)} placeholder="이메일을 입력하세요." />
          <input type='text' name='group' onChange={e => onChange(e)} placeholder="본인의 소속을 입력하세요." />
          <S.SignupBtnBox>
            <button>회원가입</button>
          </S.SignupBtnBox>
        </S.SignupInputBox>
      </S.SignupContainer>
    </S.SignupLayout>
  );
};

export default SignupComponent;