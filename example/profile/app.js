import React from "react";
import styled from "styled-components";
import {hot} from "react-hot-loader";

const Container = styled.div`
	width: 780px;
	margin: 20px auto;
	&>h2{
		font-size: 20px;
		color: darkorange;
		padding-bottom: 20px;
	}
	&>p{
		font-size: 17px;
		padding-bottom: 20px;
		padding-left: 20px;
		&.paragraph{
			line-height: 30px;
		}
	}
`;
const List = styled.ul`
	padding-left:20px;
	&>li{
		display: flex;
		align-items: center;
		font-size: 16px;
		position: relative;
		padding-bottom: 20px;
		&>label{
		 width: ${({lw})=> lw||70}px;
		}
		&>i{
		  font-style: normal;
			color: darkorange;
			padding: 0 10px;
		}
		&>em{
			color: darkorange;
			position: absolute;
			top: 0;
			left: -15px;
		}
	}
`;

const Project = styled.section`
	padding-left: 20px;
	&>h3{
		font-size: 18px;
		padding-bottom: 15px;
	}
	&>p{
		font-size: 16px;
		padding-bottom: 15px;
	}
`;

class App extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	render() {
		return <Container>
			<h2>联系方式</h2>
			<List>
				<li><label>手机：</label><span>1517-2037-122</span></li>
				<li><label>Email：</label><span>1066761470@qq.com</span></li>
				<li><label>微信号：</label><span>hashfunction</span></li>
			</List>
			<h2>个人信息</h2>
			<List>
				<li>李扬<i>/</i>男<i>/</i>1989</li>
				<li>本科<i>/</i>湖北理工学院<i>/</i>信息与计算科学 2009-2015（于2011-2013年入伍当义务兵两年）</li>
				<li>工作年限：4年</li>
				<li>Github：https://github.com/liymax</li>
				<li>期望职位：前端工程师, nodejs工程师</li>
				<li>期望城市：武汉，深圳，杭州</li>
			</List>
			<h2>工作经历</h2>
			<p>上海赐云网络有限公司（2014.10 ~ 2015.08）</p>
			<p>深圳天行家科技有限公司（2015.10 ~ 2017.05）</p>
			<p>中软国际有限公司（2017.06 ~ 今）</p>
			<h2>项目经验</h2>
			<Project>
				<h3>项目名</h3>
				<p>ISale Portal网站（2018.05 ~ 今）</p>
				<h3>项目描述</h3>
				<p>该项目主要是为了方便客户访问各种业务服务，类似PC端的门户网页，团队成员有10+人</p>
				<h3>实现技术</h3>
				<p>主要是vue、vuex、vue-router、less和element ui等</p>
				<h3>职责描述</h3>
				<List>
					<li><em>1</em>作为三位核心开发之一，一边负责重要业务模块的开发，一边开发公共组件和技术难点的攻克</li>
					<li><em>2</em>主动实现无element ui依赖的组件，并在业务开发实践中减少其使用，<br /><br />
						从而在后面能从容应对各种需求变化，让客户深表满意</li>
					<li><em>3</em>负责指导刚入职新手员工，让他们快速熟悉相关技术，能尽早投入工作，加快个人成长</li>
				</List>
			</Project>

			<Project>
				<h3>项目名</h3>
				<p>WeLink移动项目（2018.03 ~ 2018.05）</p>
				<h3>项目描述</h3>
				<p>该项目是一个基于web的移动端项目，能运行在多个平台上，团队成员有20+人</p>
				<h3>实现技术</h3>
				<p>主要是react、redux、webpack、d3和less等</p>
				<h3>职责描述</h3>
				<List>
					<li><em>1</em>项目主要开发者，负责项目的框架搭建和相关技术调研和选型</li>
					<li><em>2</em>负责整体框架的优化和全局共公接口的封装，以及主要业务模块的开发</li>
					<li><em>3</em>负责项目开发中遇到的跨平台问题和兼容性问题的研究，以及解决方案的制定和实施</li>
				</List>
			</Project>

			<Project>
				<h3>项目名</h3>
				<p>Plink项目管理平台（2017.06 ~ 2018.02）</p>
				<h3>项目描述</h3>
				<p>该项目主要为了打造一个管理公司各种项目的集成管理平台，团队成员有15+人</p>
				<h3>实现技术</h3>
				<p>主要是react、redux、webpack、d3和sass等</p>
				<h3>职责描述</h3>
				<List>
					<li><em>1</em>项目主要开发者，负责项目主要业务模块的重构，保证了项目良性发展</li>
					<li><em>2</em>负责开发各种能满足客户需求的复杂图表组件</li>
					<li><em>3</em>负责研究并攻克项目开发中遇到的各种技术难点</li>
				</List>
			</Project>
			<h2>开源技术</h2>
			<p className={'paragraph'}>
				个人在经过react方面的大量开发实践之后，积累了很多宝贵经验，并结合react最近推出的全新context api,
				构思了一个概念简洁且方便灵活的状态管理库，使用上大量借鉴redux, 在用法上非常相似。项目地址：
				https://github.com/liymax/pddux
			</p>
			<h2>技能清单</h2>
			<List lw={90}>
				<li><label>编程语言：</label><span>js(es6)/css3/html5/golang</span></li>
				<li><label>Web框架：</label><span>koa.js/iris</span></li>
				<li><label>前端框架：</label><span>react/redux/d3/vue/styled-components</span></li>
				<li><label>前端工具：</label><span>webpack/rollup/gulp/less/sass</span></li>
				<li><label>版本管理：</label><span>git/svn</span></li>
				<li><label>服务运维：</label><span>linux/shell</span></li>
			</List>
			<h2>自我评价</h2>
			<List style={{paddingLeft:40}}>
				<li><em>1</em>对开发有着浓厚的兴趣，能专注于开发工作，并快速上手新项目。</li>
				<li><em>2</em>对新兴技术充满期待和热情，喜欢迎接具有挑战的事情。</li>
				<li><em>3</em>做事认真负责，严于律己，在开发上更是从不含糊。</li>
				<li><em>4</em>喜欢交流，乐与分享，无论是技术上见解还是生活上的感悟。</li>
			</List>
		</Container>;
	}
}

export default hot(module)(App)
