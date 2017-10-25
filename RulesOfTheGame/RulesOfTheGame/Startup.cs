using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RulesOfTheGame.Startup))]
namespace RulesOfTheGame
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
