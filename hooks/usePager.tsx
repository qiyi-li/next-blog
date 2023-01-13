import Link from "next/link";
import _ from "lodash";
import style from "./pager.module.sass";

type Options = {
	page: number,
	totalPage: number,
	count: number,
	url: (page: number) => string
}
const defaultUrl = (n: number) => `?page=${n}`;
export const usePager = (options: Options) => {
	const {page, totalPage, count, url: _url} = options;
	const url = _url || defaultUrl;
	const numbers = [1];
	for (let i = page - 2; i < page + 2; i++) {
		numbers.push(i);
	}
	numbers.push(totalPage);
	const pageNumbers = _.uniq(numbers).sort((a, b) => a - b).filter(n => n > 0 && n <= totalPage)?.reduce((result, n) => {
		(n - (result[result.length - 1] || 0)) === 1 ? result.push(n) : result.push(-1, n);
		return result;
	}, [] as number[]);

	const pager = (totalPage > 1 ?
			<div className={style.wrapper}>
				{page !== 1 && <Link className={style.link} href={url(page - 1)}>上一页</Link>}
				{pageNumbers.map((n) => n === -1 ? <span> ...</span> :
					<Link className={`${page === n ? style.currentLink : ""} ${style.link}`} href={url(n)}>{n}</Link>)}
				{page < totalPage && <Link className={style.link} href={url(page + 1)}>下一页</Link>}
				<span>
			共{count}篇文章，当前第{page}/{totalPage}页
		</span>
			</div> : null
	);
	return {
		pager
	};
};