import { IController } from '../IController';
import { Request, Response, NextFunction } from 'express';
import { createEntity } from '../../domain-layer/IEntity';
import { UserEntity } from '../../domain-layer/UserEntity';
import { Users } from '../../infrastructure-layer/models/Users';
import { IEntity } from '../../domain-layer/IEntity';
import { RegistrationService } from './RegistrationService';
import { UserRepository } from '../../infrastructure-layer/UserRepository';
import CryptoUtils from './../../utils/CryptoUtils';

export class RegistrationController implements IController<Users, UserEntity, UserRepository, RegistrationService> {

    private registrationService: RegistrationService;

    public constructor(registrationService: RegistrationService) {
        this.registrationService = registrationService;
    }

    create(req: Request, res: Response, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
    update(req: Request, res: Response, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
    list(req: Request, res: Response, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }
    fetch(req: Request, res: Response, next: NextFunction): void {
        throw new Error("Method not implemented.");
    }

    validate(req: Request, res: Response, next: NextFunction) : void {
        const model: Users = new Users();
        model.nuid = parseInt(req.params.nuid, 10);
        model.pin = CryptoUtils.encrypt(req.body.pin.toString());
        const entity: IEntity<Users> = createEntity(UserEntity, model);

        const dataListener = (result: boolean) => {
            this.registrationService.emit('CLEANUP');
            res.status(200).json({success:result});
        }

        const errorListener = (error: Error) => {
            this.registrationService.emit('CLEANUP');
            res.status(500).json({ error });
        }

        this.registrationService.on('VALIDATE_SUCCESS', dataListener).on('ERROR', errorListener).once('CLEANUP', () => {
            this.registrationService.removeListener('VALIDATE_SUCCESS', dataListener);
            this.registrationService.removeListener('ERROR', errorListener);
        });

        this.registrationService.validate(entity as UserEntity);
    }
   
   
}


