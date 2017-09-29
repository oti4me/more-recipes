"use strict"

import data from "../models/data";

class Users{

	constructor(data){
		this.data = data;
	}

	getUserProfile(id){
		
		return this.data.users[id];
	}
}

export default (new Users(data.users));