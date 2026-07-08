import { Injectable, NotFoundException, ConflictException,} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../prisma/prisma.service';
//=====================================================

@Injectable()
export class UsersService {
    //=Array===========================
    // for know we use array 
    // private users = [
    //     {
    //         id: 1,
    //         fullName: 'Sajad',
    //         email: 'sajad@example.com',
    //         password: '123456',
    //     },
    // ];

    //=ConstructorForPrisma===========================
    constructor(private readonly prisma: PrismaService) {}

    //=SetReadonly===========================
    private readonly userSelect = {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
    };

    //=Find===========================
    async findAll() {
        return this.prisma.user.findMany({
            select: this.userSelect,
            orderBy: {id: 'asc',},
        });
    }
    
    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: this.userSelect,
        });
        
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        
        return user;
    }

    //=Create===========================
    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {email: createUserDto.email,},
        });
        
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        return this.prisma.user.create({
            data: createUserDto,
            select: this.userSelect,
        });
    }
    
    //=Update===========================
    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: this.userSelect,
        });
    }
    
    //=Remove===========================
    async remove(id: number) {
        const user = await this.findOne(id);

        await this.prisma.user.delete({
            where: { id },
        });
        
        return {
            message: 'User deleted successfully',
            deletedUser: user,
        };
    }

}
