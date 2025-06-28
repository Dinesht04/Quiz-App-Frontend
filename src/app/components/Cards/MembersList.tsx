type MemberListProps = {
  clientList: string[];
};

export default function MemberList({ clientList }: MemberListProps) {
  return (
    <div className="flex justify-center items-center p-4 min-h-[200px] bg-gray-100 font-inter">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 className="text-xl font-bold text-white">Room Members</h2>
        </div>
        <div className="p-6">
          {clientList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientList.map((username, index) => (
                    <tr
                      key={username}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 rounded-bl-lg">
                        {username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 rounded-br-lg">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                          Online
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No members in the room yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
