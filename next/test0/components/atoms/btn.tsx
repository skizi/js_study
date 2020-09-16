

const Btn: React.FC = ( props ) => {

  return (
    <>
		<style jsx>
			{`
				button{
					height:30px;
					line-height:30px;
					background-color:#ddd;
					border-radius:4px;
					border:0px;
					display:block;
					cursor:pointer;
				}
			`}
		</style>
		<button className={props.optionClassName} onClick={props.btnClick}>{props.children}</button>
    </>
  );

};

export default Btn;