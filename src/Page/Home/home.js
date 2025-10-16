import CompanyList from "../../components/CompanyList/CompanyList";
import SearchForm from "../../components/SearchForm/SearchForm";
import SkillList from "../../components/SkillList/SkillList";

function Home(){
    return(
        <>
        <div className="Home">
            <h1>
                1000+ IT Jobs For Developer
            </h1>
            <SearchForm/>
            <SkillList/>
            <CompanyList/>
        </div>
        </>
    )
}
export default Home;