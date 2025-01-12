#include<bits/stdc++.h>
using namespace std;
#define ll long long 

int main()
{
    ll t;
    cin>>t;
    while(t--)
    {
        ll n;
        cin>>n;
        ll arr[n];
        for(ll i=0;i<n;i++)
        {
            cin>>arr[i];
        }


        vector <ll> prefix(n,0);
        prefix[0] = arr[0];
        set <ll> st;
        st.insert(arr[0]);
        for(ll i=1;i<n;i++)
        {
            prefix[i] += prefix[i-1] + arr[i];
            st.insert(prefix[i]); 
        }

        // for(ll i=0;i<n;i++)
        // {
        //     cout<<prefix[i]<<" ";
        // }
        // cout<<endl;

        for(ll i=1;i<n;i++)
        {
            // prefix[i] = prefix[i] - prefix[i-1];
            // prefix[n-1] = prefix[n-1] - prefix[i-1];
            prefix[i] = prefix[i] - arr[i-1];
            prefix[n-1] = prefix[n-1] - arr[i-1];
            st.insert(prefix[n-1]);
            st.insert(prefix[i]);
        }
        st.insert(0);
 
        cout<<st.size()<<endl; 
        for(auto it : st)
        {
            cout<<it<<" ";
        }
        cout<<endl;
    }
}