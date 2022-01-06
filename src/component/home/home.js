import React, { useState, useEffect, Suspense } from 'react';
import './home.css';
import src from '../images/search.png';
import back from '../images/Back.png';
import {useSelector,useDispatch} from 'react-redux';
import {setData} from '../../redux/actions';
const Card = React.lazy(() => import('../card/card'));

const Home = () => {

	const [listItems, setListItems] = useState([]);
	const [title, setTitle] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	const [filteredData,setFilteredData] = useState(listItems);
	const [page, setPage] = useState(1);
	const resultData = useSelector((state) => state.home.result)
	const dispatch = useDispatch()

	useEffect(() => {
		fetchData();
		window.addEventListener('scroll', handleScroll);
	}, []);

	const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
		
	};

	const fetchData = async () => {	
		if(page<=3){
			setTimeout(async () => {
				const result = await fetch(`./CONTENTLISTINGPAGE-PAGE${page}.json`);
				const data = await result.json();
				setPage(page + 1);
				setListItems(() => {
					return [...listItems, ...data.page["content-items"].content];
				});
				console.log(data.page.title)
				setTitle(data.page.title)
				setFilteredData(() => {
					return [...listItems, ...data.page["content-items"].content];
				});
			}, 200);
		}
	};

	useEffect(() => {
		dispatch(setData(filteredData))
	}, [filteredData]);

	useEffect(() => {
		if (!isFetching) return;
		fetchMoreData();
	}, [isFetching]);

	const fetchMoreData = () => {
		fetchData();
		setIsFetching(false);
	};

	const handleSearch = (event) => {
		let value = event?event.target.value.toLowerCase():"";
		const result = listItems.filter((val) => val.name.toLowerCase().includes(value.toLowerCase()));
		setFilteredData(result)
	}

	return (
		<React.Fragment>

			<div className='head'>
				<img src={back} className='back-icon'/>
				<h1 id= "title" >{title}</h1>
				<div className='search-box' >	
					<input  className='input-field'  type="text" onChange={(event) =>handleSearch(event)} />
					<img src={src} className='search-icon'/>
				</div>
			</div>
	
			<div className=' list grid grid-cols-3 space-x-8 > * + *'>
				{resultData.map((listItem) => (
					<Suspense fallback={<h3>Loading...</h3>}>
						<Card src={listItem["poster-image"]} 
							name = {listItem.name} />
					</Suspense>
	
				))}
			</div>
			
		</React.Fragment>
	);
};

export default Home;
