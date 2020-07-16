import AxiosService from './Axios.service';
import CompanyProfile from '../model/CompanyProfile';

export default class CompanyProfileService {

    static getCompanyProfile = async () => {
        try {
            const response = await AxiosService.api.get('/company/profile');
            return CompanyProfile.fromJSON(response.data);
        } catch (error) {
            console.log("Could not get company profile: ", error);
        }
    };
}