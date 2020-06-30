import data from './data.json';
import Mock from 'mockjs';

Mock.mock( '/goods', {code:0,data:data.goods} )
Mock.mock( '/comment', {code:0,data:data.ratings} )
Mock.mock( '/detail', {code:0,data:data.info} )
