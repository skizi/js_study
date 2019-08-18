class Sub {

	constructor(){

		this.element = $( '<div>' );
		this.element.html( 'Sub' );
		this.element.css({
			lineHeight:'30px',
			marginTop:'10px',
			padding:'10px',
			border:'1px solid #ddd',
			borderRadius:'10px'
		});

	}


	get name(){
		return this.element.html();
	}

}


export {Sub};