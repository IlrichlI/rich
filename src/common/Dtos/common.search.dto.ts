import { ApiProperty } from '@nestjs/swagger';


export class CommonSearchDto {

        @ApiProperty()
        page: number

        @ApiProperty()
        size: number

}