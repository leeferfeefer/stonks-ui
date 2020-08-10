import AxiosService from './Axios.service';
import CompanyProfile from '../model/CompanyProfile';

export default class CompanyProfileService {

    static getCompanyProfile = async (stockSymbol) => {
        let companyProfile = {};
        try {
            const response = await AxiosService.api.get('/stocks/company/profile', {
                params: {
                    stockSymbol
                }
            });
            companyProfile = CompanyProfile.fromJSON(response.data);
        } catch (error) {
            console.log("Could not get company profile: ", error);
        }
        return companyProfile;
    };
}