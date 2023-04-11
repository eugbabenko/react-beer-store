import { BeersService } from './beers.service';
import { BeerListDTO } from './dtos/beer-list.dto';
import { BeerDTO } from './dtos/beer.dto';
import { FindBeersQueryParamsDTO } from './dtos/find-beers-query-params.dto';
export declare class BeersController {
    private readonly beersService;
    constructor(beersService: BeersService);
    getAll(findBeersQueryParamsDTO: FindBeersQueryParamsDTO): Promise<BeerListDTO>;
    findOne(id: number): Promise<BeerDTO>;
}
