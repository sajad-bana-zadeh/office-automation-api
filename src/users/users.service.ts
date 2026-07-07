import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//=====================================================

@Injectable()
export class UsersService {
    //=Array===========================
    // for know we use array 
    private users = [
        {
            id: 1,
            fullName: 'Sajad',
            email: 'sajad@example.com',
            password: '123456',
        },
    ];
    
    //=Find===========================
    public findAll() {
        return this.users;
    }
    
    public findOne(id: number) {
        const user = this.users.find((user) => user.id === id); // "find" at this code, To find a user(user) by "id" from the "users" array
        
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        
        return user;
    }

    //=Create===========================
    create(createUserDto: CreateUserDto) {
        const newUser = {
            id: this.users.length + 1,
            ...createUserDto,
        };
        
        this.users.push(newUser); // "push" at this code, To add a new user(newUser) to the "users" array
        
        return newUser;
    }
    
    //=Update===========================
    update(id: number, updateUserDto: UpdateUserDto) {
        const user = this.findOne(id);
        
        Object.assign(user, updateUserDto); // "Object.assign" at this code, To update a user(user) to the "users" array
        
        return user;
    }
    
    //=Remove===========================
    remove(id: number) {
        const user = this.findOne(id);
        this.users = this.users.filter((user) => user.id !== id); // "filter" at this code,if find "id" into array ,delete it and make a new array.
        
        return {
            message: 'User deleted successfully',
            deletedUser: user,
        };
    }

}
