import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { In, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
    creatorEmail: string,
  ) {
    const creator = await this.userService.getUserByEmail(creatorEmail);
    const { users, ...restCreateData } = createNotificationDto;
    const usersDB = users ? await this.userService.findAllByIds(users) : [];

    usersDB.push(creator);
    const group = this.notificationRepository.create({
      users: usersDB,
      ...restCreateData,
      createdBy: creator,
    });

    return await this.notificationRepository.save(group);
  }

  async findAll() {
    const notifications = await this.notificationRepository.find({
      relations: ['createdBy', 'users'],
    });
    return notifications;
  }

  async findAllByIds(ids: Array<string>) {
    return await this.notificationRepository.find({ where: { id: In(ids) } });
  }

  async findOneById(id: string) {
    const notification = await this.notificationRepository.findOne({
      where: {
        id: id,
      },
      select: {
        users: {
          id: true,
        },
      },
      relations: {
        users: true,
        createdBy: true,
      },
    });
    return notification;
  }

  async update(
    notification: Notification,
    updateNotificationDto: UpdateNotificationDto,
  ) {
    const updatedNotification = notification;

    if (updateNotificationDto.users) {
      const users = await this.userService.findAllByIds(
        updateNotificationDto.users,
      );
      updatedNotification.users = users;
    } else {
      updatedNotification.users = notification.users;
    }

    updatedNotification.name = updateNotificationDto.name || notification.name;
    updatedNotification.message =
      updateNotificationDto.message || notification.message;
    updatedNotification.type = updateNotificationDto.type || notification.type;
    updatedNotification.createdBy = notification.createdBy;
    updatedNotification.timestamp =
      updateNotificationDto.timestamp || notification.timestamp;

    return this.notificationRepository.save(updatedNotification);
  }

  async remove(id: string) {
    return await this.notificationRepository.delete({ id: id });
  }
}
